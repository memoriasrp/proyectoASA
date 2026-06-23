
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model TipoUsuario
 * 
 */
export type TipoUsuario = $Result.DefaultSelection<Prisma.$TipoUsuarioPayload>
/**
 * Model OpcionMenu
 * 
 */
export type OpcionMenu = $Result.DefaultSelection<Prisma.$OpcionMenuPayload>
/**
 * Model PermisoPantalla
 * 
 */
export type PermisoPantalla = $Result.DefaultSelection<Prisma.$PermisoPantallaPayload>
/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more TipoUsuarios
 * const tipoUsuarios = await prisma.tipoUsuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more TipoUsuarios
   * const tipoUsuarios = await prisma.tipoUsuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.tipoUsuario`: Exposes CRUD operations for the **TipoUsuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TipoUsuarios
    * const tipoUsuarios = await prisma.tipoUsuario.findMany()
    * ```
    */
  get tipoUsuario(): Prisma.TipoUsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.opcionMenu`: Exposes CRUD operations for the **OpcionMenu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OpcionMenus
    * const opcionMenus = await prisma.opcionMenu.findMany()
    * ```
    */
  get opcionMenu(): Prisma.OpcionMenuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permisoPantalla`: Exposes CRUD operations for the **PermisoPantalla** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PermisoPantallas
    * const permisoPantallas = await prisma.permisoPantalla.findMany()
    * ```
    */
  get permisoPantalla(): Prisma.PermisoPantallaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    TipoUsuario: 'TipoUsuario',
    OpcionMenu: 'OpcionMenu',
    PermisoPantalla: 'PermisoPantalla',
    Usuario: 'Usuario'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "tipoUsuario" | "opcionMenu" | "permisoPantalla" | "usuario"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      TipoUsuario: {
        payload: Prisma.$TipoUsuarioPayload<ExtArgs>
        fields: Prisma.TipoUsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TipoUsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoUsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TipoUsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoUsuarioPayload>
          }
          findFirst: {
            args: Prisma.TipoUsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoUsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TipoUsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoUsuarioPayload>
          }
          findMany: {
            args: Prisma.TipoUsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoUsuarioPayload>[]
          }
          create: {
            args: Prisma.TipoUsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoUsuarioPayload>
          }
          createMany: {
            args: Prisma.TipoUsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TipoUsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoUsuarioPayload>[]
          }
          delete: {
            args: Prisma.TipoUsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoUsuarioPayload>
          }
          update: {
            args: Prisma.TipoUsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoUsuarioPayload>
          }
          deleteMany: {
            args: Prisma.TipoUsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TipoUsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TipoUsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoUsuarioPayload>[]
          }
          upsert: {
            args: Prisma.TipoUsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoUsuarioPayload>
          }
          aggregate: {
            args: Prisma.TipoUsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTipoUsuario>
          }
          groupBy: {
            args: Prisma.TipoUsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<TipoUsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.TipoUsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<TipoUsuarioCountAggregateOutputType> | number
          }
        }
      }
      OpcionMenu: {
        payload: Prisma.$OpcionMenuPayload<ExtArgs>
        fields: Prisma.OpcionMenuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OpcionMenuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpcionMenuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OpcionMenuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpcionMenuPayload>
          }
          findFirst: {
            args: Prisma.OpcionMenuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpcionMenuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OpcionMenuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpcionMenuPayload>
          }
          findMany: {
            args: Prisma.OpcionMenuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpcionMenuPayload>[]
          }
          create: {
            args: Prisma.OpcionMenuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpcionMenuPayload>
          }
          createMany: {
            args: Prisma.OpcionMenuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OpcionMenuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpcionMenuPayload>[]
          }
          delete: {
            args: Prisma.OpcionMenuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpcionMenuPayload>
          }
          update: {
            args: Prisma.OpcionMenuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpcionMenuPayload>
          }
          deleteMany: {
            args: Prisma.OpcionMenuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OpcionMenuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OpcionMenuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpcionMenuPayload>[]
          }
          upsert: {
            args: Prisma.OpcionMenuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpcionMenuPayload>
          }
          aggregate: {
            args: Prisma.OpcionMenuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOpcionMenu>
          }
          groupBy: {
            args: Prisma.OpcionMenuGroupByArgs<ExtArgs>
            result: $Utils.Optional<OpcionMenuGroupByOutputType>[]
          }
          count: {
            args: Prisma.OpcionMenuCountArgs<ExtArgs>
            result: $Utils.Optional<OpcionMenuCountAggregateOutputType> | number
          }
        }
      }
      PermisoPantalla: {
        payload: Prisma.$PermisoPantallaPayload<ExtArgs>
        fields: Prisma.PermisoPantallaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermisoPantallaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPantallaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermisoPantallaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPantallaPayload>
          }
          findFirst: {
            args: Prisma.PermisoPantallaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPantallaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermisoPantallaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPantallaPayload>
          }
          findMany: {
            args: Prisma.PermisoPantallaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPantallaPayload>[]
          }
          create: {
            args: Prisma.PermisoPantallaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPantallaPayload>
          }
          createMany: {
            args: Prisma.PermisoPantallaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermisoPantallaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPantallaPayload>[]
          }
          delete: {
            args: Prisma.PermisoPantallaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPantallaPayload>
          }
          update: {
            args: Prisma.PermisoPantallaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPantallaPayload>
          }
          deleteMany: {
            args: Prisma.PermisoPantallaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermisoPantallaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermisoPantallaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPantallaPayload>[]
          }
          upsert: {
            args: Prisma.PermisoPantallaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPantallaPayload>
          }
          aggregate: {
            args: Prisma.PermisoPantallaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermisoPantalla>
          }
          groupBy: {
            args: Prisma.PermisoPantallaGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermisoPantallaGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermisoPantallaCountArgs<ExtArgs>
            result: $Utils.Optional<PermisoPantallaCountAggregateOutputType> | number
          }
        }
      }
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    tipoUsuario?: TipoUsuarioOmit
    opcionMenu?: OpcionMenuOmit
    permisoPantalla?: PermisoPantallaOmit
    usuario?: UsuarioOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TipoUsuarioCountOutputType
   */

  export type TipoUsuarioCountOutputType = {
    usuarios: number
    permisos: number
  }

  export type TipoUsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | TipoUsuarioCountOutputTypeCountUsuariosArgs
    permisos?: boolean | TipoUsuarioCountOutputTypeCountPermisosArgs
  }

  // Custom InputTypes
  /**
   * TipoUsuarioCountOutputType without action
   */
  export type TipoUsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuarioCountOutputType
     */
    select?: TipoUsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TipoUsuarioCountOutputType without action
   */
  export type TipoUsuarioCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
  }

  /**
   * TipoUsuarioCountOutputType without action
   */
  export type TipoUsuarioCountOutputTypeCountPermisosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermisoPantallaWhereInput
  }


  /**
   * Count Type OpcionMenuCountOutputType
   */

  export type OpcionMenuCountOutputType = {
    permisos: number
  }

  export type OpcionMenuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permisos?: boolean | OpcionMenuCountOutputTypeCountPermisosArgs
  }

  // Custom InputTypes
  /**
   * OpcionMenuCountOutputType without action
   */
  export type OpcionMenuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenuCountOutputType
     */
    select?: OpcionMenuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OpcionMenuCountOutputType without action
   */
  export type OpcionMenuCountOutputTypeCountPermisosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermisoPantallaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model TipoUsuario
   */

  export type AggregateTipoUsuario = {
    _count: TipoUsuarioCountAggregateOutputType | null
    _avg: TipoUsuarioAvgAggregateOutputType | null
    _sum: TipoUsuarioSumAggregateOutputType | null
    _min: TipoUsuarioMinAggregateOutputType | null
    _max: TipoUsuarioMaxAggregateOutputType | null
  }

  export type TipoUsuarioAvgAggregateOutputType = {
    id: number | null
  }

  export type TipoUsuarioSumAggregateOutputType = {
    id: number | null
  }

  export type TipoUsuarioMinAggregateOutputType = {
    id: number | null
    nombre: string | null
  }

  export type TipoUsuarioMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
  }

  export type TipoUsuarioCountAggregateOutputType = {
    id: number
    nombre: number
    _all: number
  }


  export type TipoUsuarioAvgAggregateInputType = {
    id?: true
  }

  export type TipoUsuarioSumAggregateInputType = {
    id?: true
  }

  export type TipoUsuarioMinAggregateInputType = {
    id?: true
    nombre?: true
  }

  export type TipoUsuarioMaxAggregateInputType = {
    id?: true
    nombre?: true
  }

  export type TipoUsuarioCountAggregateInputType = {
    id?: true
    nombre?: true
    _all?: true
  }

  export type TipoUsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TipoUsuario to aggregate.
     */
    where?: TipoUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoUsuarios to fetch.
     */
    orderBy?: TipoUsuarioOrderByWithRelationInput | TipoUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TipoUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TipoUsuarios
    **/
    _count?: true | TipoUsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TipoUsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TipoUsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TipoUsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TipoUsuarioMaxAggregateInputType
  }

  export type GetTipoUsuarioAggregateType<T extends TipoUsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateTipoUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTipoUsuario[P]>
      : GetScalarType<T[P], AggregateTipoUsuario[P]>
  }




  export type TipoUsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TipoUsuarioWhereInput
    orderBy?: TipoUsuarioOrderByWithAggregationInput | TipoUsuarioOrderByWithAggregationInput[]
    by: TipoUsuarioScalarFieldEnum[] | TipoUsuarioScalarFieldEnum
    having?: TipoUsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TipoUsuarioCountAggregateInputType | true
    _avg?: TipoUsuarioAvgAggregateInputType
    _sum?: TipoUsuarioSumAggregateInputType
    _min?: TipoUsuarioMinAggregateInputType
    _max?: TipoUsuarioMaxAggregateInputType
  }

  export type TipoUsuarioGroupByOutputType = {
    id: number
    nombre: string
    _count: TipoUsuarioCountAggregateOutputType | null
    _avg: TipoUsuarioAvgAggregateOutputType | null
    _sum: TipoUsuarioSumAggregateOutputType | null
    _min: TipoUsuarioMinAggregateOutputType | null
    _max: TipoUsuarioMaxAggregateOutputType | null
  }

  type GetTipoUsuarioGroupByPayload<T extends TipoUsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TipoUsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TipoUsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TipoUsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], TipoUsuarioGroupByOutputType[P]>
        }
      >
    >


  export type TipoUsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    usuarios?: boolean | TipoUsuario$usuariosArgs<ExtArgs>
    permisos?: boolean | TipoUsuario$permisosArgs<ExtArgs>
    _count?: boolean | TipoUsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tipoUsuario"]>

  export type TipoUsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["tipoUsuario"]>

  export type TipoUsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["tipoUsuario"]>

  export type TipoUsuarioSelectScalar = {
    id?: boolean
    nombre?: boolean
  }

  export type TipoUsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre", ExtArgs["result"]["tipoUsuario"]>
  export type TipoUsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | TipoUsuario$usuariosArgs<ExtArgs>
    permisos?: boolean | TipoUsuario$permisosArgs<ExtArgs>
    _count?: boolean | TipoUsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TipoUsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TipoUsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TipoUsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TipoUsuario"
    objects: {
      usuarios: Prisma.$UsuarioPayload<ExtArgs>[]
      permisos: Prisma.$PermisoPantallaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
    }, ExtArgs["result"]["tipoUsuario"]>
    composites: {}
  }

  type TipoUsuarioGetPayload<S extends boolean | null | undefined | TipoUsuarioDefaultArgs> = $Result.GetResult<Prisma.$TipoUsuarioPayload, S>

  type TipoUsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TipoUsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TipoUsuarioCountAggregateInputType | true
    }

  export interface TipoUsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TipoUsuario'], meta: { name: 'TipoUsuario' } }
    /**
     * Find zero or one TipoUsuario that matches the filter.
     * @param {TipoUsuarioFindUniqueArgs} args - Arguments to find a TipoUsuario
     * @example
     * // Get one TipoUsuario
     * const tipoUsuario = await prisma.tipoUsuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TipoUsuarioFindUniqueArgs>(args: SelectSubset<T, TipoUsuarioFindUniqueArgs<ExtArgs>>): Prisma__TipoUsuarioClient<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TipoUsuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TipoUsuarioFindUniqueOrThrowArgs} args - Arguments to find a TipoUsuario
     * @example
     * // Get one TipoUsuario
     * const tipoUsuario = await prisma.tipoUsuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TipoUsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, TipoUsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TipoUsuarioClient<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TipoUsuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoUsuarioFindFirstArgs} args - Arguments to find a TipoUsuario
     * @example
     * // Get one TipoUsuario
     * const tipoUsuario = await prisma.tipoUsuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TipoUsuarioFindFirstArgs>(args?: SelectSubset<T, TipoUsuarioFindFirstArgs<ExtArgs>>): Prisma__TipoUsuarioClient<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TipoUsuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoUsuarioFindFirstOrThrowArgs} args - Arguments to find a TipoUsuario
     * @example
     * // Get one TipoUsuario
     * const tipoUsuario = await prisma.tipoUsuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TipoUsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, TipoUsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__TipoUsuarioClient<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TipoUsuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoUsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TipoUsuarios
     * const tipoUsuarios = await prisma.tipoUsuario.findMany()
     * 
     * // Get first 10 TipoUsuarios
     * const tipoUsuarios = await prisma.tipoUsuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tipoUsuarioWithIdOnly = await prisma.tipoUsuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TipoUsuarioFindManyArgs>(args?: SelectSubset<T, TipoUsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TipoUsuario.
     * @param {TipoUsuarioCreateArgs} args - Arguments to create a TipoUsuario.
     * @example
     * // Create one TipoUsuario
     * const TipoUsuario = await prisma.tipoUsuario.create({
     *   data: {
     *     // ... data to create a TipoUsuario
     *   }
     * })
     * 
     */
    create<T extends TipoUsuarioCreateArgs>(args: SelectSubset<T, TipoUsuarioCreateArgs<ExtArgs>>): Prisma__TipoUsuarioClient<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TipoUsuarios.
     * @param {TipoUsuarioCreateManyArgs} args - Arguments to create many TipoUsuarios.
     * @example
     * // Create many TipoUsuarios
     * const tipoUsuario = await prisma.tipoUsuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TipoUsuarioCreateManyArgs>(args?: SelectSubset<T, TipoUsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TipoUsuarios and returns the data saved in the database.
     * @param {TipoUsuarioCreateManyAndReturnArgs} args - Arguments to create many TipoUsuarios.
     * @example
     * // Create many TipoUsuarios
     * const tipoUsuario = await prisma.tipoUsuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TipoUsuarios and only return the `id`
     * const tipoUsuarioWithIdOnly = await prisma.tipoUsuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TipoUsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, TipoUsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TipoUsuario.
     * @param {TipoUsuarioDeleteArgs} args - Arguments to delete one TipoUsuario.
     * @example
     * // Delete one TipoUsuario
     * const TipoUsuario = await prisma.tipoUsuario.delete({
     *   where: {
     *     // ... filter to delete one TipoUsuario
     *   }
     * })
     * 
     */
    delete<T extends TipoUsuarioDeleteArgs>(args: SelectSubset<T, TipoUsuarioDeleteArgs<ExtArgs>>): Prisma__TipoUsuarioClient<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TipoUsuario.
     * @param {TipoUsuarioUpdateArgs} args - Arguments to update one TipoUsuario.
     * @example
     * // Update one TipoUsuario
     * const tipoUsuario = await prisma.tipoUsuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TipoUsuarioUpdateArgs>(args: SelectSubset<T, TipoUsuarioUpdateArgs<ExtArgs>>): Prisma__TipoUsuarioClient<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TipoUsuarios.
     * @param {TipoUsuarioDeleteManyArgs} args - Arguments to filter TipoUsuarios to delete.
     * @example
     * // Delete a few TipoUsuarios
     * const { count } = await prisma.tipoUsuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TipoUsuarioDeleteManyArgs>(args?: SelectSubset<T, TipoUsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TipoUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoUsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TipoUsuarios
     * const tipoUsuario = await prisma.tipoUsuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TipoUsuarioUpdateManyArgs>(args: SelectSubset<T, TipoUsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TipoUsuarios and returns the data updated in the database.
     * @param {TipoUsuarioUpdateManyAndReturnArgs} args - Arguments to update many TipoUsuarios.
     * @example
     * // Update many TipoUsuarios
     * const tipoUsuario = await prisma.tipoUsuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TipoUsuarios and only return the `id`
     * const tipoUsuarioWithIdOnly = await prisma.tipoUsuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TipoUsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, TipoUsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TipoUsuario.
     * @param {TipoUsuarioUpsertArgs} args - Arguments to update or create a TipoUsuario.
     * @example
     * // Update or create a TipoUsuario
     * const tipoUsuario = await prisma.tipoUsuario.upsert({
     *   create: {
     *     // ... data to create a TipoUsuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TipoUsuario we want to update
     *   }
     * })
     */
    upsert<T extends TipoUsuarioUpsertArgs>(args: SelectSubset<T, TipoUsuarioUpsertArgs<ExtArgs>>): Prisma__TipoUsuarioClient<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TipoUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoUsuarioCountArgs} args - Arguments to filter TipoUsuarios to count.
     * @example
     * // Count the number of TipoUsuarios
     * const count = await prisma.tipoUsuario.count({
     *   where: {
     *     // ... the filter for the TipoUsuarios we want to count
     *   }
     * })
    **/
    count<T extends TipoUsuarioCountArgs>(
      args?: Subset<T, TipoUsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TipoUsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TipoUsuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoUsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TipoUsuarioAggregateArgs>(args: Subset<T, TipoUsuarioAggregateArgs>): Prisma.PrismaPromise<GetTipoUsuarioAggregateType<T>>

    /**
     * Group by TipoUsuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoUsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TipoUsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TipoUsuarioGroupByArgs['orderBy'] }
        : { orderBy?: TipoUsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TipoUsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipoUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TipoUsuario model
   */
  readonly fields: TipoUsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TipoUsuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TipoUsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuarios<T extends TipoUsuario$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, TipoUsuario$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permisos<T extends TipoUsuario$permisosArgs<ExtArgs> = {}>(args?: Subset<T, TipoUsuario$permisosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TipoUsuario model
   */
  interface TipoUsuarioFieldRefs {
    readonly id: FieldRef<"TipoUsuario", 'Int'>
    readonly nombre: FieldRef<"TipoUsuario", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TipoUsuario findUnique
   */
  export type TipoUsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which TipoUsuario to fetch.
     */
    where: TipoUsuarioWhereUniqueInput
  }

  /**
   * TipoUsuario findUniqueOrThrow
   */
  export type TipoUsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which TipoUsuario to fetch.
     */
    where: TipoUsuarioWhereUniqueInput
  }

  /**
   * TipoUsuario findFirst
   */
  export type TipoUsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which TipoUsuario to fetch.
     */
    where?: TipoUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoUsuarios to fetch.
     */
    orderBy?: TipoUsuarioOrderByWithRelationInput | TipoUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TipoUsuarios.
     */
    cursor?: TipoUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TipoUsuarios.
     */
    distinct?: TipoUsuarioScalarFieldEnum | TipoUsuarioScalarFieldEnum[]
  }

  /**
   * TipoUsuario findFirstOrThrow
   */
  export type TipoUsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which TipoUsuario to fetch.
     */
    where?: TipoUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoUsuarios to fetch.
     */
    orderBy?: TipoUsuarioOrderByWithRelationInput | TipoUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TipoUsuarios.
     */
    cursor?: TipoUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TipoUsuarios.
     */
    distinct?: TipoUsuarioScalarFieldEnum | TipoUsuarioScalarFieldEnum[]
  }

  /**
   * TipoUsuario findMany
   */
  export type TipoUsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which TipoUsuarios to fetch.
     */
    where?: TipoUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoUsuarios to fetch.
     */
    orderBy?: TipoUsuarioOrderByWithRelationInput | TipoUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TipoUsuarios.
     */
    cursor?: TipoUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TipoUsuarios.
     */
    distinct?: TipoUsuarioScalarFieldEnum | TipoUsuarioScalarFieldEnum[]
  }

  /**
   * TipoUsuario create
   */
  export type TipoUsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoUsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a TipoUsuario.
     */
    data: XOR<TipoUsuarioCreateInput, TipoUsuarioUncheckedCreateInput>
  }

  /**
   * TipoUsuario createMany
   */
  export type TipoUsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TipoUsuarios.
     */
    data: TipoUsuarioCreateManyInput | TipoUsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TipoUsuario createManyAndReturn
   */
  export type TipoUsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many TipoUsuarios.
     */
    data: TipoUsuarioCreateManyInput | TipoUsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TipoUsuario update
   */
  export type TipoUsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoUsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a TipoUsuario.
     */
    data: XOR<TipoUsuarioUpdateInput, TipoUsuarioUncheckedUpdateInput>
    /**
     * Choose, which TipoUsuario to update.
     */
    where: TipoUsuarioWhereUniqueInput
  }

  /**
   * TipoUsuario updateMany
   */
  export type TipoUsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TipoUsuarios.
     */
    data: XOR<TipoUsuarioUpdateManyMutationInput, TipoUsuarioUncheckedUpdateManyInput>
    /**
     * Filter which TipoUsuarios to update
     */
    where?: TipoUsuarioWhereInput
    /**
     * Limit how many TipoUsuarios to update.
     */
    limit?: number
  }

  /**
   * TipoUsuario updateManyAndReturn
   */
  export type TipoUsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * The data used to update TipoUsuarios.
     */
    data: XOR<TipoUsuarioUpdateManyMutationInput, TipoUsuarioUncheckedUpdateManyInput>
    /**
     * Filter which TipoUsuarios to update
     */
    where?: TipoUsuarioWhereInput
    /**
     * Limit how many TipoUsuarios to update.
     */
    limit?: number
  }

  /**
   * TipoUsuario upsert
   */
  export type TipoUsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoUsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the TipoUsuario to update in case it exists.
     */
    where: TipoUsuarioWhereUniqueInput
    /**
     * In case the TipoUsuario found by the `where` argument doesn't exist, create a new TipoUsuario with this data.
     */
    create: XOR<TipoUsuarioCreateInput, TipoUsuarioUncheckedCreateInput>
    /**
     * In case the TipoUsuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TipoUsuarioUpdateInput, TipoUsuarioUncheckedUpdateInput>
  }

  /**
   * TipoUsuario delete
   */
  export type TipoUsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoUsuarioInclude<ExtArgs> | null
    /**
     * Filter which TipoUsuario to delete.
     */
    where: TipoUsuarioWhereUniqueInput
  }

  /**
   * TipoUsuario deleteMany
   */
  export type TipoUsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TipoUsuarios to delete
     */
    where?: TipoUsuarioWhereInput
    /**
     * Limit how many TipoUsuarios to delete.
     */
    limit?: number
  }

  /**
   * TipoUsuario.usuarios
   */
  export type TipoUsuario$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    cursor?: UsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * TipoUsuario.permisos
   */
  export type TipoUsuario$permisosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
    where?: PermisoPantallaWhereInput
    orderBy?: PermisoPantallaOrderByWithRelationInput | PermisoPantallaOrderByWithRelationInput[]
    cursor?: PermisoPantallaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PermisoPantallaScalarFieldEnum | PermisoPantallaScalarFieldEnum[]
  }

  /**
   * TipoUsuario without action
   */
  export type TipoUsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoUsuario
     */
    select?: TipoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipoUsuario
     */
    omit?: TipoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoUsuarioInclude<ExtArgs> | null
  }


  /**
   * Model OpcionMenu
   */

  export type AggregateOpcionMenu = {
    _count: OpcionMenuCountAggregateOutputType | null
    _avg: OpcionMenuAvgAggregateOutputType | null
    _sum: OpcionMenuSumAggregateOutputType | null
    _min: OpcionMenuMinAggregateOutputType | null
    _max: OpcionMenuMaxAggregateOutputType | null
  }

  export type OpcionMenuAvgAggregateOutputType = {
    id: number | null
  }

  export type OpcionMenuSumAggregateOutputType = {
    id: number | null
  }

  export type OpcionMenuMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    ruta: string | null
    icono: string | null
  }

  export type OpcionMenuMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    ruta: string | null
    icono: string | null
  }

  export type OpcionMenuCountAggregateOutputType = {
    id: number
    nombre: number
    ruta: number
    icono: number
    _all: number
  }


  export type OpcionMenuAvgAggregateInputType = {
    id?: true
  }

  export type OpcionMenuSumAggregateInputType = {
    id?: true
  }

  export type OpcionMenuMinAggregateInputType = {
    id?: true
    nombre?: true
    ruta?: true
    icono?: true
  }

  export type OpcionMenuMaxAggregateInputType = {
    id?: true
    nombre?: true
    ruta?: true
    icono?: true
  }

  export type OpcionMenuCountAggregateInputType = {
    id?: true
    nombre?: true
    ruta?: true
    icono?: true
    _all?: true
  }

  export type OpcionMenuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OpcionMenu to aggregate.
     */
    where?: OpcionMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpcionMenus to fetch.
     */
    orderBy?: OpcionMenuOrderByWithRelationInput | OpcionMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OpcionMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpcionMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpcionMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OpcionMenus
    **/
    _count?: true | OpcionMenuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OpcionMenuAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OpcionMenuSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OpcionMenuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OpcionMenuMaxAggregateInputType
  }

  export type GetOpcionMenuAggregateType<T extends OpcionMenuAggregateArgs> = {
        [P in keyof T & keyof AggregateOpcionMenu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOpcionMenu[P]>
      : GetScalarType<T[P], AggregateOpcionMenu[P]>
  }




  export type OpcionMenuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpcionMenuWhereInput
    orderBy?: OpcionMenuOrderByWithAggregationInput | OpcionMenuOrderByWithAggregationInput[]
    by: OpcionMenuScalarFieldEnum[] | OpcionMenuScalarFieldEnum
    having?: OpcionMenuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OpcionMenuCountAggregateInputType | true
    _avg?: OpcionMenuAvgAggregateInputType
    _sum?: OpcionMenuSumAggregateInputType
    _min?: OpcionMenuMinAggregateInputType
    _max?: OpcionMenuMaxAggregateInputType
  }

  export type OpcionMenuGroupByOutputType = {
    id: number
    nombre: string
    ruta: string
    icono: string | null
    _count: OpcionMenuCountAggregateOutputType | null
    _avg: OpcionMenuAvgAggregateOutputType | null
    _sum: OpcionMenuSumAggregateOutputType | null
    _min: OpcionMenuMinAggregateOutputType | null
    _max: OpcionMenuMaxAggregateOutputType | null
  }

  type GetOpcionMenuGroupByPayload<T extends OpcionMenuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OpcionMenuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OpcionMenuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OpcionMenuGroupByOutputType[P]>
            : GetScalarType<T[P], OpcionMenuGroupByOutputType[P]>
        }
      >
    >


  export type OpcionMenuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    ruta?: boolean
    icono?: boolean
    permisos?: boolean | OpcionMenu$permisosArgs<ExtArgs>
    _count?: boolean | OpcionMenuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["opcionMenu"]>

  export type OpcionMenuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    ruta?: boolean
    icono?: boolean
  }, ExtArgs["result"]["opcionMenu"]>

  export type OpcionMenuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    ruta?: boolean
    icono?: boolean
  }, ExtArgs["result"]["opcionMenu"]>

  export type OpcionMenuSelectScalar = {
    id?: boolean
    nombre?: boolean
    ruta?: boolean
    icono?: boolean
  }

  export type OpcionMenuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "ruta" | "icono", ExtArgs["result"]["opcionMenu"]>
  export type OpcionMenuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permisos?: boolean | OpcionMenu$permisosArgs<ExtArgs>
    _count?: boolean | OpcionMenuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OpcionMenuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OpcionMenuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OpcionMenuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OpcionMenu"
    objects: {
      permisos: Prisma.$PermisoPantallaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      ruta: string
      icono: string | null
    }, ExtArgs["result"]["opcionMenu"]>
    composites: {}
  }

  type OpcionMenuGetPayload<S extends boolean | null | undefined | OpcionMenuDefaultArgs> = $Result.GetResult<Prisma.$OpcionMenuPayload, S>

  type OpcionMenuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OpcionMenuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OpcionMenuCountAggregateInputType | true
    }

  export interface OpcionMenuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OpcionMenu'], meta: { name: 'OpcionMenu' } }
    /**
     * Find zero or one OpcionMenu that matches the filter.
     * @param {OpcionMenuFindUniqueArgs} args - Arguments to find a OpcionMenu
     * @example
     * // Get one OpcionMenu
     * const opcionMenu = await prisma.opcionMenu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OpcionMenuFindUniqueArgs>(args: SelectSubset<T, OpcionMenuFindUniqueArgs<ExtArgs>>): Prisma__OpcionMenuClient<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OpcionMenu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OpcionMenuFindUniqueOrThrowArgs} args - Arguments to find a OpcionMenu
     * @example
     * // Get one OpcionMenu
     * const opcionMenu = await prisma.opcionMenu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OpcionMenuFindUniqueOrThrowArgs>(args: SelectSubset<T, OpcionMenuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OpcionMenuClient<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OpcionMenu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpcionMenuFindFirstArgs} args - Arguments to find a OpcionMenu
     * @example
     * // Get one OpcionMenu
     * const opcionMenu = await prisma.opcionMenu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OpcionMenuFindFirstArgs>(args?: SelectSubset<T, OpcionMenuFindFirstArgs<ExtArgs>>): Prisma__OpcionMenuClient<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OpcionMenu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpcionMenuFindFirstOrThrowArgs} args - Arguments to find a OpcionMenu
     * @example
     * // Get one OpcionMenu
     * const opcionMenu = await prisma.opcionMenu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OpcionMenuFindFirstOrThrowArgs>(args?: SelectSubset<T, OpcionMenuFindFirstOrThrowArgs<ExtArgs>>): Prisma__OpcionMenuClient<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OpcionMenus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpcionMenuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OpcionMenus
     * const opcionMenus = await prisma.opcionMenu.findMany()
     * 
     * // Get first 10 OpcionMenus
     * const opcionMenus = await prisma.opcionMenu.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const opcionMenuWithIdOnly = await prisma.opcionMenu.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OpcionMenuFindManyArgs>(args?: SelectSubset<T, OpcionMenuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OpcionMenu.
     * @param {OpcionMenuCreateArgs} args - Arguments to create a OpcionMenu.
     * @example
     * // Create one OpcionMenu
     * const OpcionMenu = await prisma.opcionMenu.create({
     *   data: {
     *     // ... data to create a OpcionMenu
     *   }
     * })
     * 
     */
    create<T extends OpcionMenuCreateArgs>(args: SelectSubset<T, OpcionMenuCreateArgs<ExtArgs>>): Prisma__OpcionMenuClient<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OpcionMenus.
     * @param {OpcionMenuCreateManyArgs} args - Arguments to create many OpcionMenus.
     * @example
     * // Create many OpcionMenus
     * const opcionMenu = await prisma.opcionMenu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OpcionMenuCreateManyArgs>(args?: SelectSubset<T, OpcionMenuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OpcionMenus and returns the data saved in the database.
     * @param {OpcionMenuCreateManyAndReturnArgs} args - Arguments to create many OpcionMenus.
     * @example
     * // Create many OpcionMenus
     * const opcionMenu = await prisma.opcionMenu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OpcionMenus and only return the `id`
     * const opcionMenuWithIdOnly = await prisma.opcionMenu.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OpcionMenuCreateManyAndReturnArgs>(args?: SelectSubset<T, OpcionMenuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OpcionMenu.
     * @param {OpcionMenuDeleteArgs} args - Arguments to delete one OpcionMenu.
     * @example
     * // Delete one OpcionMenu
     * const OpcionMenu = await prisma.opcionMenu.delete({
     *   where: {
     *     // ... filter to delete one OpcionMenu
     *   }
     * })
     * 
     */
    delete<T extends OpcionMenuDeleteArgs>(args: SelectSubset<T, OpcionMenuDeleteArgs<ExtArgs>>): Prisma__OpcionMenuClient<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OpcionMenu.
     * @param {OpcionMenuUpdateArgs} args - Arguments to update one OpcionMenu.
     * @example
     * // Update one OpcionMenu
     * const opcionMenu = await prisma.opcionMenu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OpcionMenuUpdateArgs>(args: SelectSubset<T, OpcionMenuUpdateArgs<ExtArgs>>): Prisma__OpcionMenuClient<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OpcionMenus.
     * @param {OpcionMenuDeleteManyArgs} args - Arguments to filter OpcionMenus to delete.
     * @example
     * // Delete a few OpcionMenus
     * const { count } = await prisma.opcionMenu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OpcionMenuDeleteManyArgs>(args?: SelectSubset<T, OpcionMenuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OpcionMenus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpcionMenuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OpcionMenus
     * const opcionMenu = await prisma.opcionMenu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OpcionMenuUpdateManyArgs>(args: SelectSubset<T, OpcionMenuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OpcionMenus and returns the data updated in the database.
     * @param {OpcionMenuUpdateManyAndReturnArgs} args - Arguments to update many OpcionMenus.
     * @example
     * // Update many OpcionMenus
     * const opcionMenu = await prisma.opcionMenu.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OpcionMenus and only return the `id`
     * const opcionMenuWithIdOnly = await prisma.opcionMenu.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OpcionMenuUpdateManyAndReturnArgs>(args: SelectSubset<T, OpcionMenuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OpcionMenu.
     * @param {OpcionMenuUpsertArgs} args - Arguments to update or create a OpcionMenu.
     * @example
     * // Update or create a OpcionMenu
     * const opcionMenu = await prisma.opcionMenu.upsert({
     *   create: {
     *     // ... data to create a OpcionMenu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OpcionMenu we want to update
     *   }
     * })
     */
    upsert<T extends OpcionMenuUpsertArgs>(args: SelectSubset<T, OpcionMenuUpsertArgs<ExtArgs>>): Prisma__OpcionMenuClient<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OpcionMenus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpcionMenuCountArgs} args - Arguments to filter OpcionMenus to count.
     * @example
     * // Count the number of OpcionMenus
     * const count = await prisma.opcionMenu.count({
     *   where: {
     *     // ... the filter for the OpcionMenus we want to count
     *   }
     * })
    **/
    count<T extends OpcionMenuCountArgs>(
      args?: Subset<T, OpcionMenuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OpcionMenuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OpcionMenu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpcionMenuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OpcionMenuAggregateArgs>(args: Subset<T, OpcionMenuAggregateArgs>): Prisma.PrismaPromise<GetOpcionMenuAggregateType<T>>

    /**
     * Group by OpcionMenu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpcionMenuGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OpcionMenuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OpcionMenuGroupByArgs['orderBy'] }
        : { orderBy?: OpcionMenuGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OpcionMenuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOpcionMenuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OpcionMenu model
   */
  readonly fields: OpcionMenuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OpcionMenu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OpcionMenuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permisos<T extends OpcionMenu$permisosArgs<ExtArgs> = {}>(args?: Subset<T, OpcionMenu$permisosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OpcionMenu model
   */
  interface OpcionMenuFieldRefs {
    readonly id: FieldRef<"OpcionMenu", 'Int'>
    readonly nombre: FieldRef<"OpcionMenu", 'String'>
    readonly ruta: FieldRef<"OpcionMenu", 'String'>
    readonly icono: FieldRef<"OpcionMenu", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OpcionMenu findUnique
   */
  export type OpcionMenuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpcionMenuInclude<ExtArgs> | null
    /**
     * Filter, which OpcionMenu to fetch.
     */
    where: OpcionMenuWhereUniqueInput
  }

  /**
   * OpcionMenu findUniqueOrThrow
   */
  export type OpcionMenuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpcionMenuInclude<ExtArgs> | null
    /**
     * Filter, which OpcionMenu to fetch.
     */
    where: OpcionMenuWhereUniqueInput
  }

  /**
   * OpcionMenu findFirst
   */
  export type OpcionMenuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpcionMenuInclude<ExtArgs> | null
    /**
     * Filter, which OpcionMenu to fetch.
     */
    where?: OpcionMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpcionMenus to fetch.
     */
    orderBy?: OpcionMenuOrderByWithRelationInput | OpcionMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OpcionMenus.
     */
    cursor?: OpcionMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpcionMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpcionMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpcionMenus.
     */
    distinct?: OpcionMenuScalarFieldEnum | OpcionMenuScalarFieldEnum[]
  }

  /**
   * OpcionMenu findFirstOrThrow
   */
  export type OpcionMenuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpcionMenuInclude<ExtArgs> | null
    /**
     * Filter, which OpcionMenu to fetch.
     */
    where?: OpcionMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpcionMenus to fetch.
     */
    orderBy?: OpcionMenuOrderByWithRelationInput | OpcionMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OpcionMenus.
     */
    cursor?: OpcionMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpcionMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpcionMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpcionMenus.
     */
    distinct?: OpcionMenuScalarFieldEnum | OpcionMenuScalarFieldEnum[]
  }

  /**
   * OpcionMenu findMany
   */
  export type OpcionMenuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpcionMenuInclude<ExtArgs> | null
    /**
     * Filter, which OpcionMenus to fetch.
     */
    where?: OpcionMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpcionMenus to fetch.
     */
    orderBy?: OpcionMenuOrderByWithRelationInput | OpcionMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OpcionMenus.
     */
    cursor?: OpcionMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpcionMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpcionMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpcionMenus.
     */
    distinct?: OpcionMenuScalarFieldEnum | OpcionMenuScalarFieldEnum[]
  }

  /**
   * OpcionMenu create
   */
  export type OpcionMenuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpcionMenuInclude<ExtArgs> | null
    /**
     * The data needed to create a OpcionMenu.
     */
    data: XOR<OpcionMenuCreateInput, OpcionMenuUncheckedCreateInput>
  }

  /**
   * OpcionMenu createMany
   */
  export type OpcionMenuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OpcionMenus.
     */
    data: OpcionMenuCreateManyInput | OpcionMenuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OpcionMenu createManyAndReturn
   */
  export type OpcionMenuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * The data used to create many OpcionMenus.
     */
    data: OpcionMenuCreateManyInput | OpcionMenuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OpcionMenu update
   */
  export type OpcionMenuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpcionMenuInclude<ExtArgs> | null
    /**
     * The data needed to update a OpcionMenu.
     */
    data: XOR<OpcionMenuUpdateInput, OpcionMenuUncheckedUpdateInput>
    /**
     * Choose, which OpcionMenu to update.
     */
    where: OpcionMenuWhereUniqueInput
  }

  /**
   * OpcionMenu updateMany
   */
  export type OpcionMenuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OpcionMenus.
     */
    data: XOR<OpcionMenuUpdateManyMutationInput, OpcionMenuUncheckedUpdateManyInput>
    /**
     * Filter which OpcionMenus to update
     */
    where?: OpcionMenuWhereInput
    /**
     * Limit how many OpcionMenus to update.
     */
    limit?: number
  }

  /**
   * OpcionMenu updateManyAndReturn
   */
  export type OpcionMenuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * The data used to update OpcionMenus.
     */
    data: XOR<OpcionMenuUpdateManyMutationInput, OpcionMenuUncheckedUpdateManyInput>
    /**
     * Filter which OpcionMenus to update
     */
    where?: OpcionMenuWhereInput
    /**
     * Limit how many OpcionMenus to update.
     */
    limit?: number
  }

  /**
   * OpcionMenu upsert
   */
  export type OpcionMenuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpcionMenuInclude<ExtArgs> | null
    /**
     * The filter to search for the OpcionMenu to update in case it exists.
     */
    where: OpcionMenuWhereUniqueInput
    /**
     * In case the OpcionMenu found by the `where` argument doesn't exist, create a new OpcionMenu with this data.
     */
    create: XOR<OpcionMenuCreateInput, OpcionMenuUncheckedCreateInput>
    /**
     * In case the OpcionMenu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OpcionMenuUpdateInput, OpcionMenuUncheckedUpdateInput>
  }

  /**
   * OpcionMenu delete
   */
  export type OpcionMenuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpcionMenuInclude<ExtArgs> | null
    /**
     * Filter which OpcionMenu to delete.
     */
    where: OpcionMenuWhereUniqueInput
  }

  /**
   * OpcionMenu deleteMany
   */
  export type OpcionMenuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OpcionMenus to delete
     */
    where?: OpcionMenuWhereInput
    /**
     * Limit how many OpcionMenus to delete.
     */
    limit?: number
  }

  /**
   * OpcionMenu.permisos
   */
  export type OpcionMenu$permisosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
    where?: PermisoPantallaWhereInput
    orderBy?: PermisoPantallaOrderByWithRelationInput | PermisoPantallaOrderByWithRelationInput[]
    cursor?: PermisoPantallaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PermisoPantallaScalarFieldEnum | PermisoPantallaScalarFieldEnum[]
  }

  /**
   * OpcionMenu without action
   */
  export type OpcionMenuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpcionMenu
     */
    select?: OpcionMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpcionMenu
     */
    omit?: OpcionMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpcionMenuInclude<ExtArgs> | null
  }


  /**
   * Model PermisoPantalla
   */

  export type AggregatePermisoPantalla = {
    _count: PermisoPantallaCountAggregateOutputType | null
    _avg: PermisoPantallaAvgAggregateOutputType | null
    _sum: PermisoPantallaSumAggregateOutputType | null
    _min: PermisoPantallaMinAggregateOutputType | null
    _max: PermisoPantallaMaxAggregateOutputType | null
  }

  export type PermisoPantallaAvgAggregateOutputType = {
    id: number | null
    tipoUsuarioId: number | null
    opcionMenuId: number | null
  }

  export type PermisoPantallaSumAggregateOutputType = {
    id: number | null
    tipoUsuarioId: number | null
    opcionMenuId: number | null
  }

  export type PermisoPantallaMinAggregateOutputType = {
    id: number | null
    tipoUsuarioId: number | null
    opcionMenuId: number | null
  }

  export type PermisoPantallaMaxAggregateOutputType = {
    id: number | null
    tipoUsuarioId: number | null
    opcionMenuId: number | null
  }

  export type PermisoPantallaCountAggregateOutputType = {
    id: number
    tipoUsuarioId: number
    opcionMenuId: number
    _all: number
  }


  export type PermisoPantallaAvgAggregateInputType = {
    id?: true
    tipoUsuarioId?: true
    opcionMenuId?: true
  }

  export type PermisoPantallaSumAggregateInputType = {
    id?: true
    tipoUsuarioId?: true
    opcionMenuId?: true
  }

  export type PermisoPantallaMinAggregateInputType = {
    id?: true
    tipoUsuarioId?: true
    opcionMenuId?: true
  }

  export type PermisoPantallaMaxAggregateInputType = {
    id?: true
    tipoUsuarioId?: true
    opcionMenuId?: true
  }

  export type PermisoPantallaCountAggregateInputType = {
    id?: true
    tipoUsuarioId?: true
    opcionMenuId?: true
    _all?: true
  }

  export type PermisoPantallaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermisoPantalla to aggregate.
     */
    where?: PermisoPantallaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermisoPantallas to fetch.
     */
    orderBy?: PermisoPantallaOrderByWithRelationInput | PermisoPantallaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermisoPantallaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermisoPantallas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermisoPantallas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PermisoPantallas
    **/
    _count?: true | PermisoPantallaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PermisoPantallaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PermisoPantallaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermisoPantallaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermisoPantallaMaxAggregateInputType
  }

  export type GetPermisoPantallaAggregateType<T extends PermisoPantallaAggregateArgs> = {
        [P in keyof T & keyof AggregatePermisoPantalla]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermisoPantalla[P]>
      : GetScalarType<T[P], AggregatePermisoPantalla[P]>
  }




  export type PermisoPantallaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermisoPantallaWhereInput
    orderBy?: PermisoPantallaOrderByWithAggregationInput | PermisoPantallaOrderByWithAggregationInput[]
    by: PermisoPantallaScalarFieldEnum[] | PermisoPantallaScalarFieldEnum
    having?: PermisoPantallaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermisoPantallaCountAggregateInputType | true
    _avg?: PermisoPantallaAvgAggregateInputType
    _sum?: PermisoPantallaSumAggregateInputType
    _min?: PermisoPantallaMinAggregateInputType
    _max?: PermisoPantallaMaxAggregateInputType
  }

  export type PermisoPantallaGroupByOutputType = {
    id: number
    tipoUsuarioId: number
    opcionMenuId: number
    _count: PermisoPantallaCountAggregateOutputType | null
    _avg: PermisoPantallaAvgAggregateOutputType | null
    _sum: PermisoPantallaSumAggregateOutputType | null
    _min: PermisoPantallaMinAggregateOutputType | null
    _max: PermisoPantallaMaxAggregateOutputType | null
  }

  type GetPermisoPantallaGroupByPayload<T extends PermisoPantallaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermisoPantallaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermisoPantallaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermisoPantallaGroupByOutputType[P]>
            : GetScalarType<T[P], PermisoPantallaGroupByOutputType[P]>
        }
      >
    >


  export type PermisoPantallaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipoUsuarioId?: boolean
    opcionMenuId?: boolean
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
    opcionMenu?: boolean | OpcionMenuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permisoPantalla"]>

  export type PermisoPantallaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipoUsuarioId?: boolean
    opcionMenuId?: boolean
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
    opcionMenu?: boolean | OpcionMenuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permisoPantalla"]>

  export type PermisoPantallaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipoUsuarioId?: boolean
    opcionMenuId?: boolean
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
    opcionMenu?: boolean | OpcionMenuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permisoPantalla"]>

  export type PermisoPantallaSelectScalar = {
    id?: boolean
    tipoUsuarioId?: boolean
    opcionMenuId?: boolean
  }

  export type PermisoPantallaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipoUsuarioId" | "opcionMenuId", ExtArgs["result"]["permisoPantalla"]>
  export type PermisoPantallaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
    opcionMenu?: boolean | OpcionMenuDefaultArgs<ExtArgs>
  }
  export type PermisoPantallaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
    opcionMenu?: boolean | OpcionMenuDefaultArgs<ExtArgs>
  }
  export type PermisoPantallaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
    opcionMenu?: boolean | OpcionMenuDefaultArgs<ExtArgs>
  }

  export type $PermisoPantallaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PermisoPantalla"
    objects: {
      tipoUsuario: Prisma.$TipoUsuarioPayload<ExtArgs>
      opcionMenu: Prisma.$OpcionMenuPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tipoUsuarioId: number
      opcionMenuId: number
    }, ExtArgs["result"]["permisoPantalla"]>
    composites: {}
  }

  type PermisoPantallaGetPayload<S extends boolean | null | undefined | PermisoPantallaDefaultArgs> = $Result.GetResult<Prisma.$PermisoPantallaPayload, S>

  type PermisoPantallaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermisoPantallaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermisoPantallaCountAggregateInputType | true
    }

  export interface PermisoPantallaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PermisoPantalla'], meta: { name: 'PermisoPantalla' } }
    /**
     * Find zero or one PermisoPantalla that matches the filter.
     * @param {PermisoPantallaFindUniqueArgs} args - Arguments to find a PermisoPantalla
     * @example
     * // Get one PermisoPantalla
     * const permisoPantalla = await prisma.permisoPantalla.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermisoPantallaFindUniqueArgs>(args: SelectSubset<T, PermisoPantallaFindUniqueArgs<ExtArgs>>): Prisma__PermisoPantallaClient<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PermisoPantalla that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermisoPantallaFindUniqueOrThrowArgs} args - Arguments to find a PermisoPantalla
     * @example
     * // Get one PermisoPantalla
     * const permisoPantalla = await prisma.permisoPantalla.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermisoPantallaFindUniqueOrThrowArgs>(args: SelectSubset<T, PermisoPantallaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermisoPantallaClient<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermisoPantalla that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoPantallaFindFirstArgs} args - Arguments to find a PermisoPantalla
     * @example
     * // Get one PermisoPantalla
     * const permisoPantalla = await prisma.permisoPantalla.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermisoPantallaFindFirstArgs>(args?: SelectSubset<T, PermisoPantallaFindFirstArgs<ExtArgs>>): Prisma__PermisoPantallaClient<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermisoPantalla that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoPantallaFindFirstOrThrowArgs} args - Arguments to find a PermisoPantalla
     * @example
     * // Get one PermisoPantalla
     * const permisoPantalla = await prisma.permisoPantalla.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermisoPantallaFindFirstOrThrowArgs>(args?: SelectSubset<T, PermisoPantallaFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermisoPantallaClient<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PermisoPantallas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoPantallaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PermisoPantallas
     * const permisoPantallas = await prisma.permisoPantalla.findMany()
     * 
     * // Get first 10 PermisoPantallas
     * const permisoPantallas = await prisma.permisoPantalla.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permisoPantallaWithIdOnly = await prisma.permisoPantalla.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermisoPantallaFindManyArgs>(args?: SelectSubset<T, PermisoPantallaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PermisoPantalla.
     * @param {PermisoPantallaCreateArgs} args - Arguments to create a PermisoPantalla.
     * @example
     * // Create one PermisoPantalla
     * const PermisoPantalla = await prisma.permisoPantalla.create({
     *   data: {
     *     // ... data to create a PermisoPantalla
     *   }
     * })
     * 
     */
    create<T extends PermisoPantallaCreateArgs>(args: SelectSubset<T, PermisoPantallaCreateArgs<ExtArgs>>): Prisma__PermisoPantallaClient<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PermisoPantallas.
     * @param {PermisoPantallaCreateManyArgs} args - Arguments to create many PermisoPantallas.
     * @example
     * // Create many PermisoPantallas
     * const permisoPantalla = await prisma.permisoPantalla.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermisoPantallaCreateManyArgs>(args?: SelectSubset<T, PermisoPantallaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PermisoPantallas and returns the data saved in the database.
     * @param {PermisoPantallaCreateManyAndReturnArgs} args - Arguments to create many PermisoPantallas.
     * @example
     * // Create many PermisoPantallas
     * const permisoPantalla = await prisma.permisoPantalla.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PermisoPantallas and only return the `id`
     * const permisoPantallaWithIdOnly = await prisma.permisoPantalla.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermisoPantallaCreateManyAndReturnArgs>(args?: SelectSubset<T, PermisoPantallaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PermisoPantalla.
     * @param {PermisoPantallaDeleteArgs} args - Arguments to delete one PermisoPantalla.
     * @example
     * // Delete one PermisoPantalla
     * const PermisoPantalla = await prisma.permisoPantalla.delete({
     *   where: {
     *     // ... filter to delete one PermisoPantalla
     *   }
     * })
     * 
     */
    delete<T extends PermisoPantallaDeleteArgs>(args: SelectSubset<T, PermisoPantallaDeleteArgs<ExtArgs>>): Prisma__PermisoPantallaClient<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PermisoPantalla.
     * @param {PermisoPantallaUpdateArgs} args - Arguments to update one PermisoPantalla.
     * @example
     * // Update one PermisoPantalla
     * const permisoPantalla = await prisma.permisoPantalla.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermisoPantallaUpdateArgs>(args: SelectSubset<T, PermisoPantallaUpdateArgs<ExtArgs>>): Prisma__PermisoPantallaClient<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PermisoPantallas.
     * @param {PermisoPantallaDeleteManyArgs} args - Arguments to filter PermisoPantallas to delete.
     * @example
     * // Delete a few PermisoPantallas
     * const { count } = await prisma.permisoPantalla.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermisoPantallaDeleteManyArgs>(args?: SelectSubset<T, PermisoPantallaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermisoPantallas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoPantallaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PermisoPantallas
     * const permisoPantalla = await prisma.permisoPantalla.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermisoPantallaUpdateManyArgs>(args: SelectSubset<T, PermisoPantallaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermisoPantallas and returns the data updated in the database.
     * @param {PermisoPantallaUpdateManyAndReturnArgs} args - Arguments to update many PermisoPantallas.
     * @example
     * // Update many PermisoPantallas
     * const permisoPantalla = await prisma.permisoPantalla.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PermisoPantallas and only return the `id`
     * const permisoPantallaWithIdOnly = await prisma.permisoPantalla.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PermisoPantallaUpdateManyAndReturnArgs>(args: SelectSubset<T, PermisoPantallaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PermisoPantalla.
     * @param {PermisoPantallaUpsertArgs} args - Arguments to update or create a PermisoPantalla.
     * @example
     * // Update or create a PermisoPantalla
     * const permisoPantalla = await prisma.permisoPantalla.upsert({
     *   create: {
     *     // ... data to create a PermisoPantalla
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PermisoPantalla we want to update
     *   }
     * })
     */
    upsert<T extends PermisoPantallaUpsertArgs>(args: SelectSubset<T, PermisoPantallaUpsertArgs<ExtArgs>>): Prisma__PermisoPantallaClient<$Result.GetResult<Prisma.$PermisoPantallaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PermisoPantallas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoPantallaCountArgs} args - Arguments to filter PermisoPantallas to count.
     * @example
     * // Count the number of PermisoPantallas
     * const count = await prisma.permisoPantalla.count({
     *   where: {
     *     // ... the filter for the PermisoPantallas we want to count
     *   }
     * })
    **/
    count<T extends PermisoPantallaCountArgs>(
      args?: Subset<T, PermisoPantallaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermisoPantallaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PermisoPantalla.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoPantallaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PermisoPantallaAggregateArgs>(args: Subset<T, PermisoPantallaAggregateArgs>): Prisma.PrismaPromise<GetPermisoPantallaAggregateType<T>>

    /**
     * Group by PermisoPantalla.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoPantallaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PermisoPantallaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermisoPantallaGroupByArgs['orderBy'] }
        : { orderBy?: PermisoPantallaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PermisoPantallaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermisoPantallaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PermisoPantalla model
   */
  readonly fields: PermisoPantallaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PermisoPantalla.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermisoPantallaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tipoUsuario<T extends TipoUsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TipoUsuarioDefaultArgs<ExtArgs>>): Prisma__TipoUsuarioClient<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    opcionMenu<T extends OpcionMenuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OpcionMenuDefaultArgs<ExtArgs>>): Prisma__OpcionMenuClient<$Result.GetResult<Prisma.$OpcionMenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PermisoPantalla model
   */
  interface PermisoPantallaFieldRefs {
    readonly id: FieldRef<"PermisoPantalla", 'Int'>
    readonly tipoUsuarioId: FieldRef<"PermisoPantalla", 'Int'>
    readonly opcionMenuId: FieldRef<"PermisoPantalla", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PermisoPantalla findUnique
   */
  export type PermisoPantallaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
    /**
     * Filter, which PermisoPantalla to fetch.
     */
    where: PermisoPantallaWhereUniqueInput
  }

  /**
   * PermisoPantalla findUniqueOrThrow
   */
  export type PermisoPantallaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
    /**
     * Filter, which PermisoPantalla to fetch.
     */
    where: PermisoPantallaWhereUniqueInput
  }

  /**
   * PermisoPantalla findFirst
   */
  export type PermisoPantallaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
    /**
     * Filter, which PermisoPantalla to fetch.
     */
    where?: PermisoPantallaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermisoPantallas to fetch.
     */
    orderBy?: PermisoPantallaOrderByWithRelationInput | PermisoPantallaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermisoPantallas.
     */
    cursor?: PermisoPantallaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermisoPantallas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermisoPantallas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermisoPantallas.
     */
    distinct?: PermisoPantallaScalarFieldEnum | PermisoPantallaScalarFieldEnum[]
  }

  /**
   * PermisoPantalla findFirstOrThrow
   */
  export type PermisoPantallaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
    /**
     * Filter, which PermisoPantalla to fetch.
     */
    where?: PermisoPantallaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermisoPantallas to fetch.
     */
    orderBy?: PermisoPantallaOrderByWithRelationInput | PermisoPantallaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermisoPantallas.
     */
    cursor?: PermisoPantallaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermisoPantallas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermisoPantallas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermisoPantallas.
     */
    distinct?: PermisoPantallaScalarFieldEnum | PermisoPantallaScalarFieldEnum[]
  }

  /**
   * PermisoPantalla findMany
   */
  export type PermisoPantallaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
    /**
     * Filter, which PermisoPantallas to fetch.
     */
    where?: PermisoPantallaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermisoPantallas to fetch.
     */
    orderBy?: PermisoPantallaOrderByWithRelationInput | PermisoPantallaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PermisoPantallas.
     */
    cursor?: PermisoPantallaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermisoPantallas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermisoPantallas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermisoPantallas.
     */
    distinct?: PermisoPantallaScalarFieldEnum | PermisoPantallaScalarFieldEnum[]
  }

  /**
   * PermisoPantalla create
   */
  export type PermisoPantallaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
    /**
     * The data needed to create a PermisoPantalla.
     */
    data: XOR<PermisoPantallaCreateInput, PermisoPantallaUncheckedCreateInput>
  }

  /**
   * PermisoPantalla createMany
   */
  export type PermisoPantallaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PermisoPantallas.
     */
    data: PermisoPantallaCreateManyInput | PermisoPantallaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PermisoPantalla createManyAndReturn
   */
  export type PermisoPantallaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * The data used to create many PermisoPantallas.
     */
    data: PermisoPantallaCreateManyInput | PermisoPantallaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PermisoPantalla update
   */
  export type PermisoPantallaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
    /**
     * The data needed to update a PermisoPantalla.
     */
    data: XOR<PermisoPantallaUpdateInput, PermisoPantallaUncheckedUpdateInput>
    /**
     * Choose, which PermisoPantalla to update.
     */
    where: PermisoPantallaWhereUniqueInput
  }

  /**
   * PermisoPantalla updateMany
   */
  export type PermisoPantallaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PermisoPantallas.
     */
    data: XOR<PermisoPantallaUpdateManyMutationInput, PermisoPantallaUncheckedUpdateManyInput>
    /**
     * Filter which PermisoPantallas to update
     */
    where?: PermisoPantallaWhereInput
    /**
     * Limit how many PermisoPantallas to update.
     */
    limit?: number
  }

  /**
   * PermisoPantalla updateManyAndReturn
   */
  export type PermisoPantallaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * The data used to update PermisoPantallas.
     */
    data: XOR<PermisoPantallaUpdateManyMutationInput, PermisoPantallaUncheckedUpdateManyInput>
    /**
     * Filter which PermisoPantallas to update
     */
    where?: PermisoPantallaWhereInput
    /**
     * Limit how many PermisoPantallas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PermisoPantalla upsert
   */
  export type PermisoPantallaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
    /**
     * The filter to search for the PermisoPantalla to update in case it exists.
     */
    where: PermisoPantallaWhereUniqueInput
    /**
     * In case the PermisoPantalla found by the `where` argument doesn't exist, create a new PermisoPantalla with this data.
     */
    create: XOR<PermisoPantallaCreateInput, PermisoPantallaUncheckedCreateInput>
    /**
     * In case the PermisoPantalla was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermisoPantallaUpdateInput, PermisoPantallaUncheckedUpdateInput>
  }

  /**
   * PermisoPantalla delete
   */
  export type PermisoPantallaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
    /**
     * Filter which PermisoPantalla to delete.
     */
    where: PermisoPantallaWhereUniqueInput
  }

  /**
   * PermisoPantalla deleteMany
   */
  export type PermisoPantallaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermisoPantallas to delete
     */
    where?: PermisoPantallaWhereInput
    /**
     * Limit how many PermisoPantallas to delete.
     */
    limit?: number
  }

  /**
   * PermisoPantalla without action
   */
  export type PermisoPantallaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoPantalla
     */
    select?: PermisoPantallaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermisoPantalla
     */
    omit?: PermisoPantallaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoPantallaInclude<ExtArgs> | null
  }


  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
    tipoUsuarioId: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
    tipoUsuarioId: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    email: string | null
    password: string | null
    tipoUsuarioId: number | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    email: string | null
    password: string | null
    tipoUsuarioId: number | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nombre: number
    email: number
    password: number
    tipoUsuarioId: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
    tipoUsuarioId?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
    tipoUsuarioId?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    tipoUsuarioId?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    tipoUsuarioId?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    tipoUsuarioId?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    nombre: string
    email: string
    password: string
    tipoUsuarioId: number
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    tipoUsuarioId?: boolean
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    tipoUsuarioId?: boolean
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    tipoUsuarioId?: boolean
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    tipoUsuarioId?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "email" | "password" | "tipoUsuarioId", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tipoUsuario?: boolean | TipoUsuarioDefaultArgs<ExtArgs>
  }

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      tipoUsuario: Prisma.$TipoUsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      email: string
      password: string
      tipoUsuarioId: number
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tipoUsuario<T extends TipoUsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TipoUsuarioDefaultArgs<ExtArgs>>): Prisma__TipoUsuarioClient<$Result.GetResult<Prisma.$TipoUsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly password: FieldRef<"Usuario", 'String'>
    readonly tipoUsuarioId: FieldRef<"Usuario", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TipoUsuarioScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre'
  };

  export type TipoUsuarioScalarFieldEnum = (typeof TipoUsuarioScalarFieldEnum)[keyof typeof TipoUsuarioScalarFieldEnum]


  export const OpcionMenuScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    ruta: 'ruta',
    icono: 'icono'
  };

  export type OpcionMenuScalarFieldEnum = (typeof OpcionMenuScalarFieldEnum)[keyof typeof OpcionMenuScalarFieldEnum]


  export const PermisoPantallaScalarFieldEnum: {
    id: 'id',
    tipoUsuarioId: 'tipoUsuarioId',
    opcionMenuId: 'opcionMenuId'
  };

  export type PermisoPantallaScalarFieldEnum = (typeof PermisoPantallaScalarFieldEnum)[keyof typeof PermisoPantallaScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    email: 'email',
    password: 'password',
    tipoUsuarioId: 'tipoUsuarioId'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TipoUsuarioWhereInput = {
    AND?: TipoUsuarioWhereInput | TipoUsuarioWhereInput[]
    OR?: TipoUsuarioWhereInput[]
    NOT?: TipoUsuarioWhereInput | TipoUsuarioWhereInput[]
    id?: IntFilter<"TipoUsuario"> | number
    nombre?: StringFilter<"TipoUsuario"> | string
    usuarios?: UsuarioListRelationFilter
    permisos?: PermisoPantallaListRelationFilter
  }

  export type TipoUsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    usuarios?: UsuarioOrderByRelationAggregateInput
    permisos?: PermisoPantallaOrderByRelationAggregateInput
  }

  export type TipoUsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre?: string
    AND?: TipoUsuarioWhereInput | TipoUsuarioWhereInput[]
    OR?: TipoUsuarioWhereInput[]
    NOT?: TipoUsuarioWhereInput | TipoUsuarioWhereInput[]
    usuarios?: UsuarioListRelationFilter
    permisos?: PermisoPantallaListRelationFilter
  }, "id" | "nombre">

  export type TipoUsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    _count?: TipoUsuarioCountOrderByAggregateInput
    _avg?: TipoUsuarioAvgOrderByAggregateInput
    _max?: TipoUsuarioMaxOrderByAggregateInput
    _min?: TipoUsuarioMinOrderByAggregateInput
    _sum?: TipoUsuarioSumOrderByAggregateInput
  }

  export type TipoUsuarioScalarWhereWithAggregatesInput = {
    AND?: TipoUsuarioScalarWhereWithAggregatesInput | TipoUsuarioScalarWhereWithAggregatesInput[]
    OR?: TipoUsuarioScalarWhereWithAggregatesInput[]
    NOT?: TipoUsuarioScalarWhereWithAggregatesInput | TipoUsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TipoUsuario"> | number
    nombre?: StringWithAggregatesFilter<"TipoUsuario"> | string
  }

  export type OpcionMenuWhereInput = {
    AND?: OpcionMenuWhereInput | OpcionMenuWhereInput[]
    OR?: OpcionMenuWhereInput[]
    NOT?: OpcionMenuWhereInput | OpcionMenuWhereInput[]
    id?: IntFilter<"OpcionMenu"> | number
    nombre?: StringFilter<"OpcionMenu"> | string
    ruta?: StringFilter<"OpcionMenu"> | string
    icono?: StringNullableFilter<"OpcionMenu"> | string | null
    permisos?: PermisoPantallaListRelationFilter
  }

  export type OpcionMenuOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruta?: SortOrder
    icono?: SortOrderInput | SortOrder
    permisos?: PermisoPantallaOrderByRelationAggregateInput
  }

  export type OpcionMenuWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OpcionMenuWhereInput | OpcionMenuWhereInput[]
    OR?: OpcionMenuWhereInput[]
    NOT?: OpcionMenuWhereInput | OpcionMenuWhereInput[]
    nombre?: StringFilter<"OpcionMenu"> | string
    ruta?: StringFilter<"OpcionMenu"> | string
    icono?: StringNullableFilter<"OpcionMenu"> | string | null
    permisos?: PermisoPantallaListRelationFilter
  }, "id">

  export type OpcionMenuOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruta?: SortOrder
    icono?: SortOrderInput | SortOrder
    _count?: OpcionMenuCountOrderByAggregateInput
    _avg?: OpcionMenuAvgOrderByAggregateInput
    _max?: OpcionMenuMaxOrderByAggregateInput
    _min?: OpcionMenuMinOrderByAggregateInput
    _sum?: OpcionMenuSumOrderByAggregateInput
  }

  export type OpcionMenuScalarWhereWithAggregatesInput = {
    AND?: OpcionMenuScalarWhereWithAggregatesInput | OpcionMenuScalarWhereWithAggregatesInput[]
    OR?: OpcionMenuScalarWhereWithAggregatesInput[]
    NOT?: OpcionMenuScalarWhereWithAggregatesInput | OpcionMenuScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OpcionMenu"> | number
    nombre?: StringWithAggregatesFilter<"OpcionMenu"> | string
    ruta?: StringWithAggregatesFilter<"OpcionMenu"> | string
    icono?: StringNullableWithAggregatesFilter<"OpcionMenu"> | string | null
  }

  export type PermisoPantallaWhereInput = {
    AND?: PermisoPantallaWhereInput | PermisoPantallaWhereInput[]
    OR?: PermisoPantallaWhereInput[]
    NOT?: PermisoPantallaWhereInput | PermisoPantallaWhereInput[]
    id?: IntFilter<"PermisoPantalla"> | number
    tipoUsuarioId?: IntFilter<"PermisoPantalla"> | number
    opcionMenuId?: IntFilter<"PermisoPantalla"> | number
    tipoUsuario?: XOR<TipoUsuarioScalarRelationFilter, TipoUsuarioWhereInput>
    opcionMenu?: XOR<OpcionMenuScalarRelationFilter, OpcionMenuWhereInput>
  }

  export type PermisoPantallaOrderByWithRelationInput = {
    id?: SortOrder
    tipoUsuarioId?: SortOrder
    opcionMenuId?: SortOrder
    tipoUsuario?: TipoUsuarioOrderByWithRelationInput
    opcionMenu?: OpcionMenuOrderByWithRelationInput
  }

  export type PermisoPantallaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    tipoUsuarioId_opcionMenuId?: PermisoPantallaTipoUsuarioIdOpcionMenuIdCompoundUniqueInput
    AND?: PermisoPantallaWhereInput | PermisoPantallaWhereInput[]
    OR?: PermisoPantallaWhereInput[]
    NOT?: PermisoPantallaWhereInput | PermisoPantallaWhereInput[]
    tipoUsuarioId?: IntFilter<"PermisoPantalla"> | number
    opcionMenuId?: IntFilter<"PermisoPantalla"> | number
    tipoUsuario?: XOR<TipoUsuarioScalarRelationFilter, TipoUsuarioWhereInput>
    opcionMenu?: XOR<OpcionMenuScalarRelationFilter, OpcionMenuWhereInput>
  }, "id" | "tipoUsuarioId_opcionMenuId">

  export type PermisoPantallaOrderByWithAggregationInput = {
    id?: SortOrder
    tipoUsuarioId?: SortOrder
    opcionMenuId?: SortOrder
    _count?: PermisoPantallaCountOrderByAggregateInput
    _avg?: PermisoPantallaAvgOrderByAggregateInput
    _max?: PermisoPantallaMaxOrderByAggregateInput
    _min?: PermisoPantallaMinOrderByAggregateInput
    _sum?: PermisoPantallaSumOrderByAggregateInput
  }

  export type PermisoPantallaScalarWhereWithAggregatesInput = {
    AND?: PermisoPantallaScalarWhereWithAggregatesInput | PermisoPantallaScalarWhereWithAggregatesInput[]
    OR?: PermisoPantallaScalarWhereWithAggregatesInput[]
    NOT?: PermisoPantallaScalarWhereWithAggregatesInput | PermisoPantallaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PermisoPantalla"> | number
    tipoUsuarioId?: IntWithAggregatesFilter<"PermisoPantalla"> | number
    opcionMenuId?: IntWithAggregatesFilter<"PermisoPantalla"> | number
  }

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    nombre?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    tipoUsuarioId?: IntFilter<"Usuario"> | number
    tipoUsuario?: XOR<TipoUsuarioScalarRelationFilter, TipoUsuarioWhereInput>
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    tipoUsuarioId?: SortOrder
    tipoUsuario?: TipoUsuarioOrderByWithRelationInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nombre?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    tipoUsuarioId?: IntFilter<"Usuario"> | number
    tipoUsuario?: XOR<TipoUsuarioScalarRelationFilter, TipoUsuarioWhereInput>
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    tipoUsuarioId?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    password?: StringWithAggregatesFilter<"Usuario"> | string
    tipoUsuarioId?: IntWithAggregatesFilter<"Usuario"> | number
  }

  export type TipoUsuarioCreateInput = {
    nombre: string
    usuarios?: UsuarioCreateNestedManyWithoutTipoUsuarioInput
    permisos?: PermisoPantallaCreateNestedManyWithoutTipoUsuarioInput
  }

  export type TipoUsuarioUncheckedCreateInput = {
    id?: number
    nombre: string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutTipoUsuarioInput
    permisos?: PermisoPantallaUncheckedCreateNestedManyWithoutTipoUsuarioInput
  }

  export type TipoUsuarioUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    usuarios?: UsuarioUpdateManyWithoutTipoUsuarioNestedInput
    permisos?: PermisoPantallaUpdateManyWithoutTipoUsuarioNestedInput
  }

  export type TipoUsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutTipoUsuarioNestedInput
    permisos?: PermisoPantallaUncheckedUpdateManyWithoutTipoUsuarioNestedInput
  }

  export type TipoUsuarioCreateManyInput = {
    id?: number
    nombre: string
  }

  export type TipoUsuarioUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type TipoUsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type OpcionMenuCreateInput = {
    nombre: string
    ruta: string
    icono?: string | null
    permisos?: PermisoPantallaCreateNestedManyWithoutOpcionMenuInput
  }

  export type OpcionMenuUncheckedCreateInput = {
    id?: number
    nombre: string
    ruta: string
    icono?: string | null
    permisos?: PermisoPantallaUncheckedCreateNestedManyWithoutOpcionMenuInput
  }

  export type OpcionMenuUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    icono?: NullableStringFieldUpdateOperationsInput | string | null
    permisos?: PermisoPantallaUpdateManyWithoutOpcionMenuNestedInput
  }

  export type OpcionMenuUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    icono?: NullableStringFieldUpdateOperationsInput | string | null
    permisos?: PermisoPantallaUncheckedUpdateManyWithoutOpcionMenuNestedInput
  }

  export type OpcionMenuCreateManyInput = {
    id?: number
    nombre: string
    ruta: string
    icono?: string | null
  }

  export type OpcionMenuUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    icono?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OpcionMenuUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    icono?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PermisoPantallaCreateInput = {
    tipoUsuario: TipoUsuarioCreateNestedOneWithoutPermisosInput
    opcionMenu: OpcionMenuCreateNestedOneWithoutPermisosInput
  }

  export type PermisoPantallaUncheckedCreateInput = {
    id?: number
    tipoUsuarioId: number
    opcionMenuId: number
  }

  export type PermisoPantallaUpdateInput = {
    tipoUsuario?: TipoUsuarioUpdateOneRequiredWithoutPermisosNestedInput
    opcionMenu?: OpcionMenuUpdateOneRequiredWithoutPermisosNestedInput
  }

  export type PermisoPantallaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipoUsuarioId?: IntFieldUpdateOperationsInput | number
    opcionMenuId?: IntFieldUpdateOperationsInput | number
  }

  export type PermisoPantallaCreateManyInput = {
    id?: number
    tipoUsuarioId: number
    opcionMenuId: number
  }

  export type PermisoPantallaUpdateManyMutationInput = {

  }

  export type PermisoPantallaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipoUsuarioId?: IntFieldUpdateOperationsInput | number
    opcionMenuId?: IntFieldUpdateOperationsInput | number
  }

  export type UsuarioCreateInput = {
    nombre: string
    email: string
    password: string
    tipoUsuario: TipoUsuarioCreateNestedOneWithoutUsuariosInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    nombre: string
    email: string
    password: string
    tipoUsuarioId: number
  }

  export type UsuarioUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    tipoUsuario?: TipoUsuarioUpdateOneRequiredWithoutUsuariosNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    tipoUsuarioId?: IntFieldUpdateOperationsInput | number
  }

  export type UsuarioCreateManyInput = {
    id?: number
    nombre: string
    email: string
    password: string
    tipoUsuarioId: number
  }

  export type UsuarioUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    tipoUsuarioId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UsuarioListRelationFilter = {
    every?: UsuarioWhereInput
    some?: UsuarioWhereInput
    none?: UsuarioWhereInput
  }

  export type PermisoPantallaListRelationFilter = {
    every?: PermisoPantallaWhereInput
    some?: PermisoPantallaWhereInput
    none?: PermisoPantallaWhereInput
  }

  export type UsuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PermisoPantallaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TipoUsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type TipoUsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TipoUsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type TipoUsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type TipoUsuarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OpcionMenuCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruta?: SortOrder
    icono?: SortOrder
  }

  export type OpcionMenuAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OpcionMenuMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruta?: SortOrder
    icono?: SortOrder
  }

  export type OpcionMenuMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruta?: SortOrder
    icono?: SortOrder
  }

  export type OpcionMenuSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TipoUsuarioScalarRelationFilter = {
    is?: TipoUsuarioWhereInput
    isNot?: TipoUsuarioWhereInput
  }

  export type OpcionMenuScalarRelationFilter = {
    is?: OpcionMenuWhereInput
    isNot?: OpcionMenuWhereInput
  }

  export type PermisoPantallaTipoUsuarioIdOpcionMenuIdCompoundUniqueInput = {
    tipoUsuarioId: number
    opcionMenuId: number
  }

  export type PermisoPantallaCountOrderByAggregateInput = {
    id?: SortOrder
    tipoUsuarioId?: SortOrder
    opcionMenuId?: SortOrder
  }

  export type PermisoPantallaAvgOrderByAggregateInput = {
    id?: SortOrder
    tipoUsuarioId?: SortOrder
    opcionMenuId?: SortOrder
  }

  export type PermisoPantallaMaxOrderByAggregateInput = {
    id?: SortOrder
    tipoUsuarioId?: SortOrder
    opcionMenuId?: SortOrder
  }

  export type PermisoPantallaMinOrderByAggregateInput = {
    id?: SortOrder
    tipoUsuarioId?: SortOrder
    opcionMenuId?: SortOrder
  }

  export type PermisoPantallaSumOrderByAggregateInput = {
    id?: SortOrder
    tipoUsuarioId?: SortOrder
    opcionMenuId?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    tipoUsuarioId?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
    tipoUsuarioId?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    tipoUsuarioId?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    tipoUsuarioId?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
    tipoUsuarioId?: SortOrder
  }

  export type UsuarioCreateNestedManyWithoutTipoUsuarioInput = {
    create?: XOR<UsuarioCreateWithoutTipoUsuarioInput, UsuarioUncheckedCreateWithoutTipoUsuarioInput> | UsuarioCreateWithoutTipoUsuarioInput[] | UsuarioUncheckedCreateWithoutTipoUsuarioInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutTipoUsuarioInput | UsuarioCreateOrConnectWithoutTipoUsuarioInput[]
    createMany?: UsuarioCreateManyTipoUsuarioInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type PermisoPantallaCreateNestedManyWithoutTipoUsuarioInput = {
    create?: XOR<PermisoPantallaCreateWithoutTipoUsuarioInput, PermisoPantallaUncheckedCreateWithoutTipoUsuarioInput> | PermisoPantallaCreateWithoutTipoUsuarioInput[] | PermisoPantallaUncheckedCreateWithoutTipoUsuarioInput[]
    connectOrCreate?: PermisoPantallaCreateOrConnectWithoutTipoUsuarioInput | PermisoPantallaCreateOrConnectWithoutTipoUsuarioInput[]
    createMany?: PermisoPantallaCreateManyTipoUsuarioInputEnvelope
    connect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
  }

  export type UsuarioUncheckedCreateNestedManyWithoutTipoUsuarioInput = {
    create?: XOR<UsuarioCreateWithoutTipoUsuarioInput, UsuarioUncheckedCreateWithoutTipoUsuarioInput> | UsuarioCreateWithoutTipoUsuarioInput[] | UsuarioUncheckedCreateWithoutTipoUsuarioInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutTipoUsuarioInput | UsuarioCreateOrConnectWithoutTipoUsuarioInput[]
    createMany?: UsuarioCreateManyTipoUsuarioInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type PermisoPantallaUncheckedCreateNestedManyWithoutTipoUsuarioInput = {
    create?: XOR<PermisoPantallaCreateWithoutTipoUsuarioInput, PermisoPantallaUncheckedCreateWithoutTipoUsuarioInput> | PermisoPantallaCreateWithoutTipoUsuarioInput[] | PermisoPantallaUncheckedCreateWithoutTipoUsuarioInput[]
    connectOrCreate?: PermisoPantallaCreateOrConnectWithoutTipoUsuarioInput | PermisoPantallaCreateOrConnectWithoutTipoUsuarioInput[]
    createMany?: PermisoPantallaCreateManyTipoUsuarioInputEnvelope
    connect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type UsuarioUpdateManyWithoutTipoUsuarioNestedInput = {
    create?: XOR<UsuarioCreateWithoutTipoUsuarioInput, UsuarioUncheckedCreateWithoutTipoUsuarioInput> | UsuarioCreateWithoutTipoUsuarioInput[] | UsuarioUncheckedCreateWithoutTipoUsuarioInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutTipoUsuarioInput | UsuarioCreateOrConnectWithoutTipoUsuarioInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutTipoUsuarioInput | UsuarioUpsertWithWhereUniqueWithoutTipoUsuarioInput[]
    createMany?: UsuarioCreateManyTipoUsuarioInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutTipoUsuarioInput | UsuarioUpdateWithWhereUniqueWithoutTipoUsuarioInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutTipoUsuarioInput | UsuarioUpdateManyWithWhereWithoutTipoUsuarioInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type PermisoPantallaUpdateManyWithoutTipoUsuarioNestedInput = {
    create?: XOR<PermisoPantallaCreateWithoutTipoUsuarioInput, PermisoPantallaUncheckedCreateWithoutTipoUsuarioInput> | PermisoPantallaCreateWithoutTipoUsuarioInput[] | PermisoPantallaUncheckedCreateWithoutTipoUsuarioInput[]
    connectOrCreate?: PermisoPantallaCreateOrConnectWithoutTipoUsuarioInput | PermisoPantallaCreateOrConnectWithoutTipoUsuarioInput[]
    upsert?: PermisoPantallaUpsertWithWhereUniqueWithoutTipoUsuarioInput | PermisoPantallaUpsertWithWhereUniqueWithoutTipoUsuarioInput[]
    createMany?: PermisoPantallaCreateManyTipoUsuarioInputEnvelope
    set?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    disconnect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    delete?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    connect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    update?: PermisoPantallaUpdateWithWhereUniqueWithoutTipoUsuarioInput | PermisoPantallaUpdateWithWhereUniqueWithoutTipoUsuarioInput[]
    updateMany?: PermisoPantallaUpdateManyWithWhereWithoutTipoUsuarioInput | PermisoPantallaUpdateManyWithWhereWithoutTipoUsuarioInput[]
    deleteMany?: PermisoPantallaScalarWhereInput | PermisoPantallaScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UsuarioUncheckedUpdateManyWithoutTipoUsuarioNestedInput = {
    create?: XOR<UsuarioCreateWithoutTipoUsuarioInput, UsuarioUncheckedCreateWithoutTipoUsuarioInput> | UsuarioCreateWithoutTipoUsuarioInput[] | UsuarioUncheckedCreateWithoutTipoUsuarioInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutTipoUsuarioInput | UsuarioCreateOrConnectWithoutTipoUsuarioInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutTipoUsuarioInput | UsuarioUpsertWithWhereUniqueWithoutTipoUsuarioInput[]
    createMany?: UsuarioCreateManyTipoUsuarioInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutTipoUsuarioInput | UsuarioUpdateWithWhereUniqueWithoutTipoUsuarioInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutTipoUsuarioInput | UsuarioUpdateManyWithWhereWithoutTipoUsuarioInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type PermisoPantallaUncheckedUpdateManyWithoutTipoUsuarioNestedInput = {
    create?: XOR<PermisoPantallaCreateWithoutTipoUsuarioInput, PermisoPantallaUncheckedCreateWithoutTipoUsuarioInput> | PermisoPantallaCreateWithoutTipoUsuarioInput[] | PermisoPantallaUncheckedCreateWithoutTipoUsuarioInput[]
    connectOrCreate?: PermisoPantallaCreateOrConnectWithoutTipoUsuarioInput | PermisoPantallaCreateOrConnectWithoutTipoUsuarioInput[]
    upsert?: PermisoPantallaUpsertWithWhereUniqueWithoutTipoUsuarioInput | PermisoPantallaUpsertWithWhereUniqueWithoutTipoUsuarioInput[]
    createMany?: PermisoPantallaCreateManyTipoUsuarioInputEnvelope
    set?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    disconnect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    delete?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    connect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    update?: PermisoPantallaUpdateWithWhereUniqueWithoutTipoUsuarioInput | PermisoPantallaUpdateWithWhereUniqueWithoutTipoUsuarioInput[]
    updateMany?: PermisoPantallaUpdateManyWithWhereWithoutTipoUsuarioInput | PermisoPantallaUpdateManyWithWhereWithoutTipoUsuarioInput[]
    deleteMany?: PermisoPantallaScalarWhereInput | PermisoPantallaScalarWhereInput[]
  }

  export type PermisoPantallaCreateNestedManyWithoutOpcionMenuInput = {
    create?: XOR<PermisoPantallaCreateWithoutOpcionMenuInput, PermisoPantallaUncheckedCreateWithoutOpcionMenuInput> | PermisoPantallaCreateWithoutOpcionMenuInput[] | PermisoPantallaUncheckedCreateWithoutOpcionMenuInput[]
    connectOrCreate?: PermisoPantallaCreateOrConnectWithoutOpcionMenuInput | PermisoPantallaCreateOrConnectWithoutOpcionMenuInput[]
    createMany?: PermisoPantallaCreateManyOpcionMenuInputEnvelope
    connect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
  }

  export type PermisoPantallaUncheckedCreateNestedManyWithoutOpcionMenuInput = {
    create?: XOR<PermisoPantallaCreateWithoutOpcionMenuInput, PermisoPantallaUncheckedCreateWithoutOpcionMenuInput> | PermisoPantallaCreateWithoutOpcionMenuInput[] | PermisoPantallaUncheckedCreateWithoutOpcionMenuInput[]
    connectOrCreate?: PermisoPantallaCreateOrConnectWithoutOpcionMenuInput | PermisoPantallaCreateOrConnectWithoutOpcionMenuInput[]
    createMany?: PermisoPantallaCreateManyOpcionMenuInputEnvelope
    connect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PermisoPantallaUpdateManyWithoutOpcionMenuNestedInput = {
    create?: XOR<PermisoPantallaCreateWithoutOpcionMenuInput, PermisoPantallaUncheckedCreateWithoutOpcionMenuInput> | PermisoPantallaCreateWithoutOpcionMenuInput[] | PermisoPantallaUncheckedCreateWithoutOpcionMenuInput[]
    connectOrCreate?: PermisoPantallaCreateOrConnectWithoutOpcionMenuInput | PermisoPantallaCreateOrConnectWithoutOpcionMenuInput[]
    upsert?: PermisoPantallaUpsertWithWhereUniqueWithoutOpcionMenuInput | PermisoPantallaUpsertWithWhereUniqueWithoutOpcionMenuInput[]
    createMany?: PermisoPantallaCreateManyOpcionMenuInputEnvelope
    set?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    disconnect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    delete?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    connect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    update?: PermisoPantallaUpdateWithWhereUniqueWithoutOpcionMenuInput | PermisoPantallaUpdateWithWhereUniqueWithoutOpcionMenuInput[]
    updateMany?: PermisoPantallaUpdateManyWithWhereWithoutOpcionMenuInput | PermisoPantallaUpdateManyWithWhereWithoutOpcionMenuInput[]
    deleteMany?: PermisoPantallaScalarWhereInput | PermisoPantallaScalarWhereInput[]
  }

  export type PermisoPantallaUncheckedUpdateManyWithoutOpcionMenuNestedInput = {
    create?: XOR<PermisoPantallaCreateWithoutOpcionMenuInput, PermisoPantallaUncheckedCreateWithoutOpcionMenuInput> | PermisoPantallaCreateWithoutOpcionMenuInput[] | PermisoPantallaUncheckedCreateWithoutOpcionMenuInput[]
    connectOrCreate?: PermisoPantallaCreateOrConnectWithoutOpcionMenuInput | PermisoPantallaCreateOrConnectWithoutOpcionMenuInput[]
    upsert?: PermisoPantallaUpsertWithWhereUniqueWithoutOpcionMenuInput | PermisoPantallaUpsertWithWhereUniqueWithoutOpcionMenuInput[]
    createMany?: PermisoPantallaCreateManyOpcionMenuInputEnvelope
    set?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    disconnect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    delete?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    connect?: PermisoPantallaWhereUniqueInput | PermisoPantallaWhereUniqueInput[]
    update?: PermisoPantallaUpdateWithWhereUniqueWithoutOpcionMenuInput | PermisoPantallaUpdateWithWhereUniqueWithoutOpcionMenuInput[]
    updateMany?: PermisoPantallaUpdateManyWithWhereWithoutOpcionMenuInput | PermisoPantallaUpdateManyWithWhereWithoutOpcionMenuInput[]
    deleteMany?: PermisoPantallaScalarWhereInput | PermisoPantallaScalarWhereInput[]
  }

  export type TipoUsuarioCreateNestedOneWithoutPermisosInput = {
    create?: XOR<TipoUsuarioCreateWithoutPermisosInput, TipoUsuarioUncheckedCreateWithoutPermisosInput>
    connectOrCreate?: TipoUsuarioCreateOrConnectWithoutPermisosInput
    connect?: TipoUsuarioWhereUniqueInput
  }

  export type OpcionMenuCreateNestedOneWithoutPermisosInput = {
    create?: XOR<OpcionMenuCreateWithoutPermisosInput, OpcionMenuUncheckedCreateWithoutPermisosInput>
    connectOrCreate?: OpcionMenuCreateOrConnectWithoutPermisosInput
    connect?: OpcionMenuWhereUniqueInput
  }

  export type TipoUsuarioUpdateOneRequiredWithoutPermisosNestedInput = {
    create?: XOR<TipoUsuarioCreateWithoutPermisosInput, TipoUsuarioUncheckedCreateWithoutPermisosInput>
    connectOrCreate?: TipoUsuarioCreateOrConnectWithoutPermisosInput
    upsert?: TipoUsuarioUpsertWithoutPermisosInput
    connect?: TipoUsuarioWhereUniqueInput
    update?: XOR<XOR<TipoUsuarioUpdateToOneWithWhereWithoutPermisosInput, TipoUsuarioUpdateWithoutPermisosInput>, TipoUsuarioUncheckedUpdateWithoutPermisosInput>
  }

  export type OpcionMenuUpdateOneRequiredWithoutPermisosNestedInput = {
    create?: XOR<OpcionMenuCreateWithoutPermisosInput, OpcionMenuUncheckedCreateWithoutPermisosInput>
    connectOrCreate?: OpcionMenuCreateOrConnectWithoutPermisosInput
    upsert?: OpcionMenuUpsertWithoutPermisosInput
    connect?: OpcionMenuWhereUniqueInput
    update?: XOR<XOR<OpcionMenuUpdateToOneWithWhereWithoutPermisosInput, OpcionMenuUpdateWithoutPermisosInput>, OpcionMenuUncheckedUpdateWithoutPermisosInput>
  }

  export type TipoUsuarioCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<TipoUsuarioCreateWithoutUsuariosInput, TipoUsuarioUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: TipoUsuarioCreateOrConnectWithoutUsuariosInput
    connect?: TipoUsuarioWhereUniqueInput
  }

  export type TipoUsuarioUpdateOneRequiredWithoutUsuariosNestedInput = {
    create?: XOR<TipoUsuarioCreateWithoutUsuariosInput, TipoUsuarioUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: TipoUsuarioCreateOrConnectWithoutUsuariosInput
    upsert?: TipoUsuarioUpsertWithoutUsuariosInput
    connect?: TipoUsuarioWhereUniqueInput
    update?: XOR<XOR<TipoUsuarioUpdateToOneWithWhereWithoutUsuariosInput, TipoUsuarioUpdateWithoutUsuariosInput>, TipoUsuarioUncheckedUpdateWithoutUsuariosInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UsuarioCreateWithoutTipoUsuarioInput = {
    nombre: string
    email: string
    password: string
  }

  export type UsuarioUncheckedCreateWithoutTipoUsuarioInput = {
    id?: number
    nombre: string
    email: string
    password: string
  }

  export type UsuarioCreateOrConnectWithoutTipoUsuarioInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutTipoUsuarioInput, UsuarioUncheckedCreateWithoutTipoUsuarioInput>
  }

  export type UsuarioCreateManyTipoUsuarioInputEnvelope = {
    data: UsuarioCreateManyTipoUsuarioInput | UsuarioCreateManyTipoUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type PermisoPantallaCreateWithoutTipoUsuarioInput = {
    opcionMenu: OpcionMenuCreateNestedOneWithoutPermisosInput
  }

  export type PermisoPantallaUncheckedCreateWithoutTipoUsuarioInput = {
    id?: number
    opcionMenuId: number
  }

  export type PermisoPantallaCreateOrConnectWithoutTipoUsuarioInput = {
    where: PermisoPantallaWhereUniqueInput
    create: XOR<PermisoPantallaCreateWithoutTipoUsuarioInput, PermisoPantallaUncheckedCreateWithoutTipoUsuarioInput>
  }

  export type PermisoPantallaCreateManyTipoUsuarioInputEnvelope = {
    data: PermisoPantallaCreateManyTipoUsuarioInput | PermisoPantallaCreateManyTipoUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithWhereUniqueWithoutTipoUsuarioInput = {
    where: UsuarioWhereUniqueInput
    update: XOR<UsuarioUpdateWithoutTipoUsuarioInput, UsuarioUncheckedUpdateWithoutTipoUsuarioInput>
    create: XOR<UsuarioCreateWithoutTipoUsuarioInput, UsuarioUncheckedCreateWithoutTipoUsuarioInput>
  }

  export type UsuarioUpdateWithWhereUniqueWithoutTipoUsuarioInput = {
    where: UsuarioWhereUniqueInput
    data: XOR<UsuarioUpdateWithoutTipoUsuarioInput, UsuarioUncheckedUpdateWithoutTipoUsuarioInput>
  }

  export type UsuarioUpdateManyWithWhereWithoutTipoUsuarioInput = {
    where: UsuarioScalarWhereInput
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyWithoutTipoUsuarioInput>
  }

  export type UsuarioScalarWhereInput = {
    AND?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    OR?: UsuarioScalarWhereInput[]
    NOT?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    id?: IntFilter<"Usuario"> | number
    nombre?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    tipoUsuarioId?: IntFilter<"Usuario"> | number
  }

  export type PermisoPantallaUpsertWithWhereUniqueWithoutTipoUsuarioInput = {
    where: PermisoPantallaWhereUniqueInput
    update: XOR<PermisoPantallaUpdateWithoutTipoUsuarioInput, PermisoPantallaUncheckedUpdateWithoutTipoUsuarioInput>
    create: XOR<PermisoPantallaCreateWithoutTipoUsuarioInput, PermisoPantallaUncheckedCreateWithoutTipoUsuarioInput>
  }

  export type PermisoPantallaUpdateWithWhereUniqueWithoutTipoUsuarioInput = {
    where: PermisoPantallaWhereUniqueInput
    data: XOR<PermisoPantallaUpdateWithoutTipoUsuarioInput, PermisoPantallaUncheckedUpdateWithoutTipoUsuarioInput>
  }

  export type PermisoPantallaUpdateManyWithWhereWithoutTipoUsuarioInput = {
    where: PermisoPantallaScalarWhereInput
    data: XOR<PermisoPantallaUpdateManyMutationInput, PermisoPantallaUncheckedUpdateManyWithoutTipoUsuarioInput>
  }

  export type PermisoPantallaScalarWhereInput = {
    AND?: PermisoPantallaScalarWhereInput | PermisoPantallaScalarWhereInput[]
    OR?: PermisoPantallaScalarWhereInput[]
    NOT?: PermisoPantallaScalarWhereInput | PermisoPantallaScalarWhereInput[]
    id?: IntFilter<"PermisoPantalla"> | number
    tipoUsuarioId?: IntFilter<"PermisoPantalla"> | number
    opcionMenuId?: IntFilter<"PermisoPantalla"> | number
  }

  export type PermisoPantallaCreateWithoutOpcionMenuInput = {
    tipoUsuario: TipoUsuarioCreateNestedOneWithoutPermisosInput
  }

  export type PermisoPantallaUncheckedCreateWithoutOpcionMenuInput = {
    id?: number
    tipoUsuarioId: number
  }

  export type PermisoPantallaCreateOrConnectWithoutOpcionMenuInput = {
    where: PermisoPantallaWhereUniqueInput
    create: XOR<PermisoPantallaCreateWithoutOpcionMenuInput, PermisoPantallaUncheckedCreateWithoutOpcionMenuInput>
  }

  export type PermisoPantallaCreateManyOpcionMenuInputEnvelope = {
    data: PermisoPantallaCreateManyOpcionMenuInput | PermisoPantallaCreateManyOpcionMenuInput[]
    skipDuplicates?: boolean
  }

  export type PermisoPantallaUpsertWithWhereUniqueWithoutOpcionMenuInput = {
    where: PermisoPantallaWhereUniqueInput
    update: XOR<PermisoPantallaUpdateWithoutOpcionMenuInput, PermisoPantallaUncheckedUpdateWithoutOpcionMenuInput>
    create: XOR<PermisoPantallaCreateWithoutOpcionMenuInput, PermisoPantallaUncheckedCreateWithoutOpcionMenuInput>
  }

  export type PermisoPantallaUpdateWithWhereUniqueWithoutOpcionMenuInput = {
    where: PermisoPantallaWhereUniqueInput
    data: XOR<PermisoPantallaUpdateWithoutOpcionMenuInput, PermisoPantallaUncheckedUpdateWithoutOpcionMenuInput>
  }

  export type PermisoPantallaUpdateManyWithWhereWithoutOpcionMenuInput = {
    where: PermisoPantallaScalarWhereInput
    data: XOR<PermisoPantallaUpdateManyMutationInput, PermisoPantallaUncheckedUpdateManyWithoutOpcionMenuInput>
  }

  export type TipoUsuarioCreateWithoutPermisosInput = {
    nombre: string
    usuarios?: UsuarioCreateNestedManyWithoutTipoUsuarioInput
  }

  export type TipoUsuarioUncheckedCreateWithoutPermisosInput = {
    id?: number
    nombre: string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutTipoUsuarioInput
  }

  export type TipoUsuarioCreateOrConnectWithoutPermisosInput = {
    where: TipoUsuarioWhereUniqueInput
    create: XOR<TipoUsuarioCreateWithoutPermisosInput, TipoUsuarioUncheckedCreateWithoutPermisosInput>
  }

  export type OpcionMenuCreateWithoutPermisosInput = {
    nombre: string
    ruta: string
    icono?: string | null
  }

  export type OpcionMenuUncheckedCreateWithoutPermisosInput = {
    id?: number
    nombre: string
    ruta: string
    icono?: string | null
  }

  export type OpcionMenuCreateOrConnectWithoutPermisosInput = {
    where: OpcionMenuWhereUniqueInput
    create: XOR<OpcionMenuCreateWithoutPermisosInput, OpcionMenuUncheckedCreateWithoutPermisosInput>
  }

  export type TipoUsuarioUpsertWithoutPermisosInput = {
    update: XOR<TipoUsuarioUpdateWithoutPermisosInput, TipoUsuarioUncheckedUpdateWithoutPermisosInput>
    create: XOR<TipoUsuarioCreateWithoutPermisosInput, TipoUsuarioUncheckedCreateWithoutPermisosInput>
    where?: TipoUsuarioWhereInput
  }

  export type TipoUsuarioUpdateToOneWithWhereWithoutPermisosInput = {
    where?: TipoUsuarioWhereInput
    data: XOR<TipoUsuarioUpdateWithoutPermisosInput, TipoUsuarioUncheckedUpdateWithoutPermisosInput>
  }

  export type TipoUsuarioUpdateWithoutPermisosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    usuarios?: UsuarioUpdateManyWithoutTipoUsuarioNestedInput
  }

  export type TipoUsuarioUncheckedUpdateWithoutPermisosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutTipoUsuarioNestedInput
  }

  export type OpcionMenuUpsertWithoutPermisosInput = {
    update: XOR<OpcionMenuUpdateWithoutPermisosInput, OpcionMenuUncheckedUpdateWithoutPermisosInput>
    create: XOR<OpcionMenuCreateWithoutPermisosInput, OpcionMenuUncheckedCreateWithoutPermisosInput>
    where?: OpcionMenuWhereInput
  }

  export type OpcionMenuUpdateToOneWithWhereWithoutPermisosInput = {
    where?: OpcionMenuWhereInput
    data: XOR<OpcionMenuUpdateWithoutPermisosInput, OpcionMenuUncheckedUpdateWithoutPermisosInput>
  }

  export type OpcionMenuUpdateWithoutPermisosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    icono?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OpcionMenuUncheckedUpdateWithoutPermisosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    icono?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TipoUsuarioCreateWithoutUsuariosInput = {
    nombre: string
    permisos?: PermisoPantallaCreateNestedManyWithoutTipoUsuarioInput
  }

  export type TipoUsuarioUncheckedCreateWithoutUsuariosInput = {
    id?: number
    nombre: string
    permisos?: PermisoPantallaUncheckedCreateNestedManyWithoutTipoUsuarioInput
  }

  export type TipoUsuarioCreateOrConnectWithoutUsuariosInput = {
    where: TipoUsuarioWhereUniqueInput
    create: XOR<TipoUsuarioCreateWithoutUsuariosInput, TipoUsuarioUncheckedCreateWithoutUsuariosInput>
  }

  export type TipoUsuarioUpsertWithoutUsuariosInput = {
    update: XOR<TipoUsuarioUpdateWithoutUsuariosInput, TipoUsuarioUncheckedUpdateWithoutUsuariosInput>
    create: XOR<TipoUsuarioCreateWithoutUsuariosInput, TipoUsuarioUncheckedCreateWithoutUsuariosInput>
    where?: TipoUsuarioWhereInput
  }

  export type TipoUsuarioUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: TipoUsuarioWhereInput
    data: XOR<TipoUsuarioUpdateWithoutUsuariosInput, TipoUsuarioUncheckedUpdateWithoutUsuariosInput>
  }

  export type TipoUsuarioUpdateWithoutUsuariosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    permisos?: PermisoPantallaUpdateManyWithoutTipoUsuarioNestedInput
  }

  export type TipoUsuarioUncheckedUpdateWithoutUsuariosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    permisos?: PermisoPantallaUncheckedUpdateManyWithoutTipoUsuarioNestedInput
  }

  export type UsuarioCreateManyTipoUsuarioInput = {
    id?: number
    nombre: string
    email: string
    password: string
  }

  export type PermisoPantallaCreateManyTipoUsuarioInput = {
    id?: number
    opcionMenuId: number
  }

  export type UsuarioUpdateWithoutTipoUsuarioInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UsuarioUncheckedUpdateWithoutTipoUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UsuarioUncheckedUpdateManyWithoutTipoUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type PermisoPantallaUpdateWithoutTipoUsuarioInput = {
    opcionMenu?: OpcionMenuUpdateOneRequiredWithoutPermisosNestedInput
  }

  export type PermisoPantallaUncheckedUpdateWithoutTipoUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    opcionMenuId?: IntFieldUpdateOperationsInput | number
  }

  export type PermisoPantallaUncheckedUpdateManyWithoutTipoUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    opcionMenuId?: IntFieldUpdateOperationsInput | number
  }

  export type PermisoPantallaCreateManyOpcionMenuInput = {
    id?: number
    tipoUsuarioId: number
  }

  export type PermisoPantallaUpdateWithoutOpcionMenuInput = {
    tipoUsuario?: TipoUsuarioUpdateOneRequiredWithoutPermisosNestedInput
  }

  export type PermisoPantallaUncheckedUpdateWithoutOpcionMenuInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipoUsuarioId?: IntFieldUpdateOperationsInput | number
  }

  export type PermisoPantallaUncheckedUpdateManyWithoutOpcionMenuInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipoUsuarioId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}