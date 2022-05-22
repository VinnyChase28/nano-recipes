import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { EXPO_SUPABASE_KEY } from "@env";
// https://reactnative.dev/docs/security#storing-sensitive-info
console.log("supabase loaded");

export const supabase = createClient(
  "https://fodlmtsqwocmyxtgpqiw.supabase.co",
  EXPO_SUPABASE_KEY,
  {
    localStorage: AsyncStorage,
    detectSessionInUrl: false,
  }
);
