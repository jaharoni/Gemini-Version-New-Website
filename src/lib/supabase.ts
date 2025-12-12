import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const missingConfigMessage =
  'Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are not configured. ' +
  'Dynamic content editing features are disabled in this environment.';

type MinimalSupabaseError = { message: string };

type StubResponse<T = null> = {
  data: T;
  error: MinimalSupabaseError;
  count: number | null;
};

type StubPromise<T = null> = Promise<StubResponse<T>>;

type StubQueryBuilder = {
  select: (...args: unknown[]) => StubQueryBuilder;
  eq: (...args: unknown[]) => StubQueryBuilder;
  neq: (...args: unknown[]) => StubQueryBuilder;
  order: (...args: unknown[]) => StubQueryBuilder;
  in: (...args: unknown[]) => StubQueryBuilder;
  limit: (...args: unknown[]) => StubQueryBuilder;
  range: (...args: unknown[]) => StubQueryBuilder;
  single: () => StubPromise;
  maybeSingle: () => StubPromise;
  insert: (...args: unknown[]) => StubQueryBuilder;
  update: (...args: unknown[]) => StubQueryBuilder;
  delete: (...args: unknown[]) => StubQueryBuilder;
  then: StubPromise['then'];
  catch: StubPromise['catch'];
  finally: StubPromise['finally'];
};

const missingSupabaseError: MinimalSupabaseError = { message: missingConfigMessage };

const createStubQueryBuilder = () => {
  const stubResponse: StubResponse = { data: null, error: missingSupabaseError, count: null };
  const promise = Promise.resolve(stubResponse);

  const builder = {} as Partial<StubQueryBuilder>;
  const chain = () => builder as StubQueryBuilder;

  builder.select = chain;
  builder.eq = chain;
  builder.neq = chain;
  builder.order = chain;
  builder.in = chain;
  builder.limit = chain;
  builder.range = chain;
  builder.insert = chain;
  builder.update = chain;
  builder.delete = chain;
  builder.single = () => promise;
  builder.maybeSingle = () => promise;
  builder.then = promise.then.bind(promise);
  builder.catch = promise.catch.bind(promise);
  builder.finally = promise.finally.bind(promise);

  return builder as StubQueryBuilder;
};

const createStubSupabaseClient = (): SupabaseClient<unknown, unknown, unknown> =>
  ({
    from: () => createStubQueryBuilder(),
    storage: {
      from: () => ({
        getPublicUrl: () => ({ data: { publicUrl: '' }, error: missingSupabaseError }),
      }),
    },
  } as unknown as SupabaseClient<unknown, unknown, unknown>);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(missingConfigMessage);
}

export const supabase: SupabaseClient<unknown, unknown, unknown> = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : createStubSupabaseClient();
