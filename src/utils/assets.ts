/**
 * 資源路徑解析工具函式
 * 自動相容 Vite 的 base 路徑設定（例如 GitHub Pages 的 `/oneinlab/` 或 本地/AI Studio 的 `/`）
 */
export function getAssetUrl(path?: string): string {
  if (!path) return '';

  // 完整外鏈、Blob 或 Data URL 直接返回
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Vite 環境下動態取得 base (如 '/oneinlab/' 或 '/')
  const base = import.meta.env.BASE_URL || '/';

  // 去除路徑開頭的 '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // 若路徑已經包含 base 前綴（例如已經是 'oneinlab/assets/...'），避免重複拼接
  const normalizedBase = base.replace(/^\/|\/$/g, '');
  if (normalizedBase && cleanPath.startsWith(normalizedBase)) {
    return `/${cleanPath}`;
  }

  // 確保 base 尾端與 cleanPath 連接正確
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}
