import React from 'react';

// 1. Pixel Car (Orange - Accent Hero Car)
export const PixelCarOrange = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={Math.round((size * 18) / 32)}
    viewBox="0 0 32 18"
    shapeRendering="crispEdges"
    className={`inline-block ${className}`}
  >
    <rect x="3" y="16" width="26" height="2" fill="#142A43" opacity="0.4" />
    <rect x="2" y="12" width="28" height="3" fill="#E76513" />
    <rect x="1" y="13" width="30" height="2" fill="#C54E08" />
    <rect x="3" y="10" width="26" height="3" fill="#F47721" />
    <rect x="5" y="8" width="22" height="2" fill="#F47721" />
    <rect x="8" y="7" width="16" height="1" fill="#FF944D" />
    <rect x="10" y="5" width="12" height="3" fill="#F47721" />
    <rect x="12" y="4" width="8" height="1" fill="#FF944D" />
    <rect x="13" y="5" width="4" height="3" fill="#88C8FF" />
    <rect x="18" y="5" width="4" height="3" fill="#4A98E8" />
    <rect x="11" y="6" width="2" height="2" fill="#CDE4FF" />
    <rect x="30" y="11" width="2" height="2" fill="#FFE875" />
    <rect x="0" y="11" width="2" height="2" fill="#FF3B30" />
    <rect x="1" y="12" width="1" height="1" fill="#FF6B6B" />
    <rect x="6" y="12" width="5" height="5" fill="#14243A" />
    <rect x="7" y="13" width="3" height="3" fill="#8F9CAE" />
    <rect x="8" y="14" width="1" height="1" fill="#FFFFFF" />
    <rect x="22" y="12" width="5" height="5" fill="#14243A" />
    <rect x="23" y="13" width="3" height="3" fill="#8F9CAE" />
    <rect x="24" y="14" width="1" height="1" fill="#FFFFFF" />
    <rect x="6" y="9" width="18" height="1" fill="#FFA566" />
    <rect x="27" y="11" width="2" height="1" fill="#FFE875" />
  </svg>
);

// 2. Pixel Car (Blue - Showroom Sedan)
export const PixelCarBlue = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={Math.round((size * 18) / 32)}
    viewBox="0 0 32 18"
    shapeRendering="crispEdges"
    className={`inline-block ${className}`}
  >
    <rect x="3" y="16" width="26" height="2" fill="#142A43" opacity="0.4" />
    <rect x="2" y="12" width="28" height="3" fill="#245F9E" />
    <rect x="1" y="13" width="30" height="2" fill="#184373" />
    <rect x="3" y="10" width="26" height="3" fill="#327FCB" />
    <rect x="5" y="8" width="22" height="2" fill="#4A98E8" />
    <rect x="8" y="7" width="16" height="1" fill="#7DBBFF" />
    <rect x="9" y="5" width="13" height="3" fill="#327FCB" />
    <rect x="11" y="4" width="9" height="1" fill="#7DBBFF" />
    <rect x="12" y="5" width="4" height="3" fill="#CDE4FF" />
    <rect x="17" y="5" width="5" height="3" fill="#88C8FF" />
    <rect x="30" y="11" width="2" height="2" fill="#FFE875" />
    <rect x="0" y="11" width="2" height="2" fill="#FF3B30" />
    <rect x="6" y="12" width="5" height="5" fill="#14243A" />
    <rect x="7" y="13" width="3" height="3" fill="#CBD5E1" />
    <rect x="8" y="14" width="1" height="1" fill="#FFFFFF" />
    <rect x="22" y="12" width="5" height="5" fill="#14243A" />
    <rect x="23" y="13" width="3" height="3" fill="#CBD5E1" />
    <rect x="24" y="14" width="1" height="1" fill="#FFFFFF" />
  </svg>
);

// 3. Pixel Showroom Building
export const PixelShowroom = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`inline-block ${className}`}
  >
    <rect x="2" y="4" width="20" height="3" fill="#071B35" />
    <rect x="3" y="3" width="18" height="1" fill="#F47721" />
    <rect x="6" y="5" width="12" height="2" fill="#FFFFFF" />
    <rect x="8" y="5" width="4" height="1" fill="#F47721" />
    <rect x="13" y="5" width="3" height="1" fill="#071B35" />
    <rect x="3" y="7" width="18" height="13" fill="#E2F0FD" />
    <rect x="3" y="7" width="1" height="13" fill="#94A3B8" />
    <rect x="8" y="7" width="1" height="13" fill="#94A3B8" />
    <rect x="15" y="7" width="1" height="13" fill="#94A3B8" />
    <rect x="20" y="7" width="1" height="13" fill="#94A3B8" />
    <rect x="3" y="14" width="18" height="1" fill="#94A3B8" />
    <rect x="10" y="16" width="7" height="3" fill="#F47721" />
    <rect x="11" y="15" width="4" height="1" fill="#FF944D" />
    <rect x="10" y="18" width="2" height="1" fill="#14243A" />
    <rect x="15" y="18" width="2" height="1" fill="#14243A" />
    <rect x="1" y="20" width="22" height="2" fill="#64748B" />
  </svg>
);

// 4. Pixel Wrench / Tool
export const PixelWrench = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`inline-block ${className}`}
  >
    <rect x="3" y="4" width="8" height="8" fill="#F59E0B" />
    <rect x="4" y="3" width="6" height="10" fill="#F59E0B" />
    <rect x="5" y="5" width="4" height="6" fill="#F5F7FA" />
    <rect x="11" y="7" width="10" height="2" fill="#D97706" />
    <rect x="15" y="9" width="2" height="3" fill="#D97706" />
    <rect x="19" y="9" width="2" height="2" fill="#D97706" />
  </svg>
);

// 5. Pixel Calendar
export const PixelCalendar = ({ className = '', size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`inline-block ${className}`}
  >
    <rect x="3" y="4" width="18" height="16" fill="#FFFFFF" />
    <rect x="3" y="4" width="18" height="4" fill="#F47721" />
    <rect x="6" y="2" width="2" height="4" fill="#142A43" />
    <rect x="16" y="2" width="2" height="4" fill="#142A43" />
    <rect x="6" y="11" width="3" height="3" fill="#327FCB" />
    <rect x="11" y="11" width="3" height="3" fill="#327FCB" />
    <rect x="16" y="11" width="3" height="3" fill="#75A94C" />
    <rect x="6" y="15" width="3" height="3" fill="#327FCB" />
    <rect x="11" y="15" width="3" height="3" fill="#F47721" />
    <rect x="2" y="3" width="20" height="18" fill="none" stroke="#142A43" strokeWidth="1" />
  </svg>
);

// 6. Pixel Bar Chart
export const PixelChart = ({ className = '', size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`inline-block ${className}`}
  >
    <rect x="2" y="2" width="2" height="20" fill="#142A43" />
    <rect x="2" y="20" width="20" height="2" fill="#142A43" />
    <rect x="6" y="13" width="3" height="7" fill="#327FCB" />
    <rect x="11" y="9" width="3" height="11" fill="#75A94C" />
    <rect x="16" y="5" width="3" height="15" fill="#F47721" />
  </svg>
);

// 7. Pixel Clock
export const PixelClock = ({ className = '', size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`inline-block ${className}`}
  >
    <rect x="4" y="4" width="16" height="16" fill="#FFFFFF" />
    <rect x="3" y="5" width="18" height="14" fill="#FFFFFF" />
    <rect x="5" y="3" width="14" height="18" fill="#FFFFFF" />
    <rect x="5" y="5" width="14" height="14" fill="#E2F0FD" />
    <rect x="11" y="7" width="2" height="6" fill="#142A43" />
    <rect x="11" y="11" width="5" height="2" fill="#F47721" />
    <rect x="2" y="4" width="1" height="16" fill="#142A43" />
    <rect x="21" y="4" width="1" height="16" fill="#142A43" />
    <rect x="4" y="2" width="16" height="1" fill="#142A43" />
    <rect x="4" y="21" width="16" height="1" fill="#142A43" />
  </svg>
);

// 8. Pixel Checkered Flag (Workflow Finish Line)
export const PixelFlag = ({ className = '', size = 30 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`inline-block ${className}`}
  >
    <rect x="3" y="2" width="2" height="20" fill="#FFE875" />
    <rect x="5" y="3" width="3" height="3" fill="#FFFFFF" />
    <rect x="8" y="3" width="3" height="3" fill="#07182D" />
    <rect x="11" y="3" width="3" height="3" fill="#FFFFFF" />
    <rect x="14" y="3" width="3" height="3" fill="#07182D" />
    <rect x="5" y="6" width="3" height="3" fill="#07182D" />
    <rect x="8" y="6" width="3" height="3" fill="#FFFFFF" />
    <rect x="11" y="6" width="3" height="3" fill="#07182D" />
    <rect x="14" y="6" width="3" height="3" fill="#FFFFFF" />
    <rect x="5" y="9" width="3" height="3" fill="#FFFFFF" />
    <rect x="8" y="9" width="3" height="3" fill="#07182D" />
    <rect x="11" y="9" width="3" height="3" fill="#FFFFFF" />
    <rect x="14" y="9" width="3" height="3" fill="#07182D" />
  </svg>
);

// 9. Pixel Money / Coin
export const PixelMoney = ({ className = '', size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`inline-block ${className}`}
  >
    <rect x="4" y="4" width="16" height="16" fill="#F59E0B" />
    <rect x="6" y="6" width="12" height="12" fill="#FFE875" />
    <rect x="11" y="8" width="2" height="8" fill="#D97706" />
    <rect x="9" y="9" width="6" height="2" fill="#D97706" />
    <rect x="9" y="13" width="6" height="2" fill="#D97706" />
  </svg>
);

// 10. Pixel Shield
export const PixelShield = ({ className = '', size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`inline-block ${className}`}
  >
    <rect x="3" y="3" width="18" height="4" fill="#327FCB" />
    <rect x="4" y="7" width="16" height="8" fill="#4A98E8" />
    <rect x="6" y="15" width="12" height="4" fill="#327FCB" />
    <rect x="9" y="19" width="6" height="2" fill="#142A43" />
    <rect x="11" y="8" width="2" height="6" fill="#FFE875" />
    <rect x="9" y="10" width="6" height="2" fill="#FFE875" />
  </svg>
);
