/**
 * @fileOverview 适配器生成工具。
 */
KISSY.makeAdaptor = function( def ) {
	var me = KISSY.makeAdaptor;
	KISSY.add(function ( S, Ctor ) {

		return function( frameGroup ) {

			// 被适配的组件 constructor
			var Adaptee = def.adaptee || Ctor;

			// 适配器的 contructor
			// Note: 只支持 new 方式构建，不支持 function call 的方式。
			var Adaptor = function() {
				// 对传入参数进行保护性预处理
				var args = me.safeArgsGuestToHost( arguments, def.args, this );

				// 用处理过的参数调用 contructor
				var inst = Object.create( Adaptee.prototype );
				var ret = Adaptee.apply( inst, args );
				var adaptee = Object(ret) === ret ? ret : inst;

				// 建立实例之间的适配关系
				me.adaptTo( this, adaptee );
			};
			frameGroup.markCtor( Adaptor );

			// 生成适配器的代理 property
			var CreateSafeProperty = function( property ) {
				var type = def.properties[ property ];
				var real_prop = type.alias_of || property;
				// getter
				Adaptor.prototype.__defineGetter__( property, (function( property ) {
					return function() {
						// 这里，this 是 Adaptor 实例
						var ret = this._ADAPTEE_[ real_prop ];
						return ret;
					};
				})());
				if ( type.writable ) {
					// setter
					Adaptor.prototype.__defineSetter__( property, (function( property ) {
						return function( val ) {
							// 这里，this 是 Adaptor 实例
							this._ADAPTEE_[ real_prop ] = val;
							return val;
						};
					})());
					frameGroup.grantReadWrite( Adaptor.prototype, property );
				} else {
					frameGroup.grantRead( Adaptor.prototype, property );
				}
			};

			// 根据适配器的描述定义，生成所需的全部代理 property
			for ( var property in def.properties ) {
				CreateSafeProperty( property );
			}

			// 生成适配器的代理 method
			var CreateSafeMethod = function( method ) {
				Adaptor.prototype[ method ] = function() {
					// 这里，this 是 Adaptor 实例

					// 对传入参数进行保护性预处理
					var args = me.safeArgsGuestToHost( arguments, def.methods[ method ], this );

					// 调用对应的组件实例方法
					var ret = this._ADAPTEE_[ method ].apply( this._ADAPTEE_, args );

					// 把返回值转换成适合返回给 guest code 的值
					ret = me.safeValueHostToGuest( ret );

					// TODO: 考虑是否需要根据 def 中的某种配置对返回值做处理
					// Note: 这里的 ret 对象类型如果是未经 mark 的，该怎样？

					return ret;
				};
				frameGroup.grantMethod( Adaptor, method );
			};

			// 根据适配器的描述定义，生成所需的全部代理 method
			for ( var method in def.methods ) {
				CreateSafeMethod( method );
			}

			// 生成适配器的静态代理 method
			var CreateSafeStaticMethod = function( Ctor, method ) {
				Ctor[ method ] = frameGroup.markFunction( function() {
					// 这里，this 是 ……？
					// whatever，反正不用它。

					// 对传入参数进行保护性预处理
					var args = me.safeArgsGuestToHost( arguments, def.static_methods[ method ], null );

					// 调用对应的组件静态方法
					var ret = Adaptee[ method ].apply( null, args );

					// 把返回值转换成适合返回给 guest code 的值
					ret = me.safeValueHostToGuest( ret );

					return ret;
				});
				frameGroup.grantRead( Ctor, method );
			};

			// 根据适配器的描述定义，生成所需的全部静态代理 method
			for ( var method in def.static_methods ) {
				CreateSafeStaticMethod( Adaptor, method );
			}

			// 建立类型之间的适配关系
			me.adaptTo( Adaptor, Adaptee );

			// 在暴露给 caja 的时候，用这个 HybridAdaptor 代替 Adaptor，
			// 即可以同时支持 new 和 function call 的构建方式
			var HybridAdaptor = frameGroup.markFunction( function( a1, a2, a3 ) {
				return new Adaptor( a1, a2, a3 );
			});
			for ( var method in def.static_methods ) {
				CreateSafeStaticMethod( HybridAdaptor, method );
			}

			/**
			 * @param context 上下文
			 * @param context.mod 沙箱的模块范围，所有操作必须限定到模块范围之内去执行
			 * @param context.frame 单个模块的沙箱
			 * @return {Object} 实际的组件对象
			 */
			return function ( context ) {
				var expose = {};
				expose[ def.ctor ] = HybridAdaptor;
				return expose;
			}
		};
	}, {
		requires: def.requires
	});
};

// 按定义的类型对参数表中的数据对象进行保护性预处理，以传递给被适配的组件。
// Note: 此处的入参虽然来自于 guest code，但在穿越 taming boundary 进入 host
// code 之后，已经不再是驯化对象，而是被转换成对应的野化对象了。
KISSY.makeAdaptor.safeOneArgGuestToHost = function( origArg, type, adaptor ) {
	var safeArg;

	// 如果原值是适配器对象，则替换成对应的已被适配对象
	if ( KISSY.isObject(origArg) && origArg._ADAPTEE_ ) {
		origArg = origArg._ADAPTEE_;
	}

	if ( type === 'simple' ) {

		safeArg = origArg;

	} else if ( type === 'selector' ) {

		// TODO: 这里要对 selector 的范围进行约束
		safeArg = origArg;

	} else if ( type === 'callback' ) {

		// 最简单粗暴的回调函数转换处理：把来自被适配对象的回调参数直接传递给原回调函数。
		// Note: 由于“原回调函数”来自于 guest code 的 tamed function，所以传给它的入口
		// 参数会在穿越 taming boundary 的时候被自动转换为对应的驯化对象，其中如果涉及到
		// 未经 mark 过的类型，则会丢失，比如 CustomEventObject。
		safeArg = (function( guestCallback ) {
			return function() {
				guestCallback.apply( adaptor, arguments );
			};
		})( origArg );

	} else if ( typeof type === 'function' ) {

		// 这里的 type 是一个 factory function，用于生成一个具有回参保护功能的回调函数
		safeArg = type( origArg, adaptor );

	} else {
		throw new Error('Unrecognized type.');
	}
	return safeArg;
};

KISSY.makeAdaptor.safeArgsGuestToHost = function( origArgs, types, adaptor ) {
	var safeArgs = [];
	for ( var i = 0; i < types.length; i ++ ) {
		var type = types[ i ];
		safeArgs[i] = KISSY.makeAdaptor.safeOneArgGuestToHost( origArgs[i], type, adaptor );
	}
	return safeArgs;
};

KISSY.makeAdaptor.safeValueHostToGuest = function( origValue ) {
	var ret = origValue;

	// 如果原值是已被适配对象，则替换成适配器本身
	if ( KISSY.isObject(origValue) && origValue._ADAPTOR_ ) {
		ret = origValue._ADAPTOR_;
	}

	// 如果原值不是已被适配对象，但其类型为“可适配”，则创建一个适配器来代理它
	else if ( KISSY.isObject(origValue) && origValue.constructor && origValue.constructor._ADAPTOR_ ) {
		var adaptor = new origValue.constructor._ADAPTOR_;
		this.adaptTo( adaptor, origValue );
		ret = adaptor;
	}

	return ret;
};

KISSY.makeAdaptor.adaptTo = function( adaptor, adaptee ) {
	adaptor._ADAPTEE_ = adaptee;
	adaptee._ADAPTOR_ = adaptor;
};
