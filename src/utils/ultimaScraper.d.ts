export interface UltimaScraperConfigType {
  info: Info;
  settings: Settings;
  supported: Supported;
}

interface Supported {
  onlyfans: Onlyfans;
  fansly: Fansly;
}

interface Fansly {
  settings: FanslySettings;
}

interface FanslySettings {
  auto_profile_choice: any[];
  auto_model_choice: boolean;
  auto_api_choice: boolean;
  auto_media_choice: string;
  browser: Browser;
  jobs: Jobs;
  download_directories: string[];
  file_directory_format: string;
  filename_format: string;
  metadata_directories: string[];
  metadata_directory_format: string;
  delete_legacy_metadata: boolean;
  text_length: number;
  video_quality: string;
  overwrite_files: boolean;
  date_format: string;
  ignored_keywords: any[];
  ignore_type: string;
  blacklists: any[];
  webhook: boolean;
}

interface Onlyfans {
  settings: OnlyfansSettings;
}

interface OnlyfansSettings {
  auto_profile_choice: string;
  auto_model_choice: string;
  auto_api_choice: boolean;
  auto_media_choice: string;
  browser: Browser;
  jobs: Jobs;
  download_directories: string[];
  file_directory_format: string;
  filename_format: string;
  metadata_directories: string[];
  metadata_directory_format: string;
  delete_legacy_metadata: boolean;
  text_length: number;
  video_quality: string;
  overwrite_files: boolean;
  date_format: string;
  ignored_keywords: any[];
  ignore_type: string;
  blacklists: string[];
  webhook: boolean;
}

interface Jobs {
  scrape: Scrape;
  metadata: Metadata;
}

interface Metadata {
  posts: boolean;
  comments: boolean;
}

interface Scrape {
  subscriptions: boolean;
  messages: boolean;
  paid_contents: boolean;
}

interface Browser {
  auth: boolean;
}

interface Settings {
  auto_site_choice: string;
  export_type: string;
  max_threads: number;
  min_drive_space: number;
  helpers: Helpers;
  webhooks: Webhooks;
  exit_on_completion: boolean;
  infinite_loop: boolean;
  loop_timeout: number;
  dynamic_rules_link: string;
  proxies: any[];
  cert: string;
  random_string: string;
  tui: Tui;
}

interface Tui {
  active: boolean;
  host: string;
  port: number;
  api_key: string;
}

interface Webhooks {
  global_webhooks: string[];
  global_status: boolean;
  auth_webhook: Authwebhook;
  download_webhook: Authwebhook;
}

interface Authwebhook {
  succeeded: Succeeded;
  failed: Succeeded;
}

interface Succeeded {
  webhooks: any[];
  status?: any;
  hide_sensitive_info: boolean;
}

interface Helpers {
  renamer: boolean;
  reformat_media: boolean;
  downloader: boolean;
  delete_empty_directories: boolean;
}

interface Info {
  version: number;
}
