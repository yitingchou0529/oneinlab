/**
 * 資源路徑解析工具函式
 * 自動相容 Vite 的 base 路徑設定（支援 相對路徑 './'、GitHub Pages 子目錄 或 根路徑 '/'）
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

  // Vite 環境下動態取得 base (如 './', '/oneinlab/' 或 '/')
  const base = import.meta.env.BASE_URL || './';

  // 去除路徑開頭的 './' 或 '/'
  const cleanPath = path.replace(/^(\.\/|\/)+/, '');

  // 若路徑已經包含 base 前綴，避免重複拼接
  const normalizedBase = base.replace(/^\/|\/$/g, '');
  if (normalizedBase && normalizedBase !== '.' && cleanPath.startsWith(normalizedBase)) {
    return `/${cleanPath}`;
  }

  if (base === './') {
    return `./${cleanPath}`;
  }

  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}


