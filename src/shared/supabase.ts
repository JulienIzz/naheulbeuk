import { createClient } from "@supabase/supabase-js";

import { appEnv } from "#shared/appEnv";

export const supabase = createClient(
  appEnv.supabaseUrl,
  appEnv.supabasePublishableKey,
);
