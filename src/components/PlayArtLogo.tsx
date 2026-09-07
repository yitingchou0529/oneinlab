import React from 'react';

interface PlayArtLogoProps {
  className?: string;
  size?: number;
}

export const PlayArtLogo: React.FC<PlayArtLogoProps> = ({ 
  className = "w-full h-full", 
  size 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 500" 
      width={size || "100%"} 
      height={size || "100%"}
      className={className}
      aria-label="玩藝所 LOGO"
    >
      {/* 玩藝所專屬 LOGO：戲劇微笑面具 + 藝術調色盤 */}
      <g id="play-art-logo" fill="none" stroke="#362E2B" strokeLinecap="round" strokeLinejoin="round">
        
        {/* 左半部：戲劇微笑面具外框與中軸垂直線 */}
        <path 
          d="M 238 42 
             C 185 58, 110 88, 46 126 
             C 56 220, 78 340, 238 464 
             L 238 42 Z" 
          strokeWidth="20" 
          fill="none" 
        />

        {/* 面具五官：微笑閉眼 (弧形線條) */}
        <path 
          d="M 98 226 C 120 192 166 192 188 226" 
          strokeWidth="19" 
          strokeLinecap="round"
          fill="none" 
        />

        {/* 面具五官：愉悅微笑嘴角 (飽滿實心月牙形) */}
        <path 
          d="M 136 304 
             C 162 316, 192 323, 218 326 
             C 220 334, 218 342, 213 349 
             C 188 368, 154 352, 136 304 Z" 
          fill="#362E2B" 
          stroke="#362E2B" 
          strokeWidth="6" 
        />

        {/* 右半部：藝術調色盤外圓弧 (圓潤手繪線條，起訖點略帶呼吸感) */}
        <path 
          d="M 264 46 
             C 382 48, 466 138, 466 248 
             C 466 352, 384 456, 262 464" 
          strokeWidth="20" 
          strokeLinecap="round"
          fill="none" 
        />

        {/* 右半部調色盤元素：上方暖黃色顏料塊 (鵝卵石有機造型) */}
        <path 
          d="M 306 108 
             C 334 102, 356 120, 354 144 
             C 352 166, 328 178, 300 174 
             C 278 170, 274 146, 284 126 
             C 290 114, 296 110, 306 108 Z" 
          fill="#DFAB59" 
          stroke="none" 
        />

        {/* 右半部調色盤元素：右中灰綠色顏料塊 (鼠尾草綠) */}
        <path 
          d="M 374 176 
             C 406 172, 426 190, 428 208 
             C 430 228, 412 246, 386 246 
             C 362 246, 348 230, 348 210 
             C 348 192, 360 178, 374 176 Z" 
          fill="#7E8E72" 
          stroke="none" 
        />

        {/* 右半部調色盤元素：右下灰藍色顏料塊 (單寧藍/灰藍) */}
        <path 
          d="M 386 266 
             C 418 262, 438 282, 436 304 
             C 434 324, 412 342, 386 338 
             C 362 334, 350 316, 352 294 
             C 354 278, 368 268, 386 266 Z" 
          fill="#758D9E" 
          stroke="none" 
        />

        {/* 右半部調色盤元素：大拇指握孔 (傾斜橢圓掏空圓孔) */}
        <ellipse 
          cx="308" 
          cy="372" 
          rx="32" 
          ry="48" 
          transform="rotate(-26 308 372)" 
          strokeWidth="19" 
          stroke="#362E2B" 
          fill="none" 
        />

      </g>
    </svg>
  );
};
