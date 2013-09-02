/**
 * @fileOverview ���������ɹ��ߡ�
 */
KISSY.makeAdaptor = function( def ) {
	var me = KISSY.makeAdaptor;
	KISSY.add(function ( S, Ctor ) {

		return function( frameGroup ) {

			// ���������� constructor
			var Adaptee = def.adaptee || Ctor;

			// �������� contructor
			// Note: ֻ֧�� new ��ʽ��������֧�� function call �ķ�ʽ��
			var Adaptor = function() {
				// �Դ���������б�����Ԥ����
				var args = me.safeArgsGuestToHost( arguments, def.args, this );

				// �ô������Ĳ������� contructor
				var inst = Object.create( Adaptee.prototype );
				var ret = Adaptee.apply( inst, args );
				var adaptee = Object(ret) === ret ? ret : inst;

				// ����ʵ��֮��������ϵ
				me.adaptTo( this, adaptee );
			};
			frameGroup.markCtor( Adaptor );

			// �����������Ĵ��� property
			var CreateSafeProperty = function( property ) {
				var type = def.properties[ property ];
				var real_prop = type.alias_of || property;
				// getter
				Adaptor.prototype.__defineGetter__( property, (function( property ) {
					return function() {
						// ���this �� Adaptor ʵ��
						var ret = this._ADAPTEE_[ real_prop ];
						return ret;
					};
				})());
				if ( type.writable ) {
					// setter
					Adaptor.prototype.__defineSetter__( property, (function( property ) {
						return function( val ) {
							// ���this �� Adaptor ʵ��
							this._ADAPTEE_[ real_prop ] = val;
							return val;
						};
					})());
					frameGroup.grantReadWrite( Adaptor.prototype, property );
				} else {
					frameGroup.grantRead( Adaptor.prototype, property );
				}
			};

			// �������������������壬���������ȫ������ property
			for ( var property in def.properties ) {
				CreateSafeProperty( property );
			}

			// �����������Ĵ��� method
			var CreateSafeMethod = function( method ) {
				Adaptor.prototype[ method ] = function() {
					// ���this �� Adaptor ʵ��

					// �Դ���������б�����Ԥ����
					var args = me.safeArgsGuestToHost( arguments, def.methods[ method ], this );

					// ���ö�Ӧ�����ʵ������
					var ret = this._ADAPTEE_[ method ].apply( this._ADAPTEE_, args );

					// �ѷ���ֵת�����ʺϷ��ظ� guest code ��ֵ
					ret = me.safeValueHostToGuest( ret );

					// TODO: �����Ƿ���Ҫ���� def �е�ĳ�����öԷ���ֵ������
					// Note: ����� ret �������������δ�� mark �ģ���������

					return ret;
				};
				frameGroup.grantMethod( Adaptor, method );
			};

			// �������������������壬���������ȫ������ method
			for ( var method in def.methods ) {
				CreateSafeMethod( method );
			}

			// �����������ľ�̬���� method
			var CreateSafeStaticMethod = function( Ctor, method ) {
				Ctor[ method ] = frameGroup.markFunction( function() {
					// ���this �� ������
					// whatever��������������

					// �Դ���������б�����Ԥ����
					var args = me.safeArgsGuestToHost( arguments, def.static_methods[ method ], null );

					// ���ö�Ӧ�������̬����
					var ret = Adaptee[ method ].apply( null, args );

					// �ѷ���ֵת�����ʺϷ��ظ� guest code ��ֵ
					ret = me.safeValueHostToGuest( ret );

					return ret;
				});
				frameGroup.grantRead( Ctor, method );
			};

			// �������������������壬���������ȫ����̬���� method
			for ( var method in def.static_methods ) {
				CreateSafeStaticMethod( Adaptor, method );
			}

			// ��������֮��������ϵ
			me.adaptTo( Adaptor, Adaptee );

			// �ڱ�¶�� caja ��ʱ������� HybridAdaptor ���� Adaptor��
			// ������ͬʱ֧�� new �� function call �Ĺ�����ʽ
			var HybridAdaptor = frameGroup.markFunction( function( a1, a2, a3 ) {
				return new Adaptor( a1, a2, a3 );
			});
			for ( var method in def.static_methods ) {
				CreateSafeStaticMethod( HybridAdaptor, method );
			}

			/**
			 * @param context ������
			 * @param context.mod ɳ���ģ�鷶Χ�����в��������޶���ģ�鷶Χ֮��ȥִ��
			 * @param context.frame ����ģ���ɳ��
			 * @return {Object} ʵ�ʵ��������
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

// ����������ͶԲ������е����ݶ�����б�����Ԥ�������Դ��ݸ�������������
// Note: �˴��������Ȼ������ guest code�����ڴ�Խ taming boundary ���� host
// code ֮���Ѿ�������ѱ�����󣬶��Ǳ�ת���ɶ�Ӧ��Ұ�������ˡ�
KISSY.makeAdaptor.safeOneArgGuestToHost = function( origArg, type, adaptor ) {
	var safeArg;

	// ���ԭֵ���������������滻�ɶ�Ӧ���ѱ��������
	if ( KISSY.isObject(origArg) && origArg._ADAPTEE_ ) {
		origArg = origArg._ADAPTEE_;
	}

	if ( type === 'simple' ) {

		safeArg = origArg;

	} else if ( type === 'selector' ) {

		// TODO: ����Ҫ�� selector �ķ�Χ����Լ��
		safeArg = origArg;

	} else if ( type === 'callback' ) {

		// ��򵥴ֱ��Ļص�����ת�������������Ա��������Ļص�����ֱ�Ӵ��ݸ�ԭ�ص�������
		// Note: ���ڡ�ԭ�ص������������� guest code �� tamed function�����Դ����������
		// �������ڴ�Խ taming boundary ��ʱ���Զ�ת��Ϊ��Ӧ��ѱ��������������漰��
		// δ�� mark �������ͣ���ᶪʧ������ CustomEventObject��
		safeArg = (function( guestCallback ) {
			return function() {
				guestCallback.apply( adaptor, arguments );
			};
		})( origArg );

	} else if ( typeof type === 'function' ) {

		// ����� type ��һ�� factory function����������һ�����лزα������ܵĻص�����
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

	// ���ԭֵ���ѱ�����������滻������������
	if ( KISSY.isObject(origValue) && origValue._ADAPTOR_ ) {
		ret = origValue._ADAPTOR_;
	}

	// ���ԭֵ�����ѱ�������󣬵�������Ϊ�������䡱���򴴽�һ����������������
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