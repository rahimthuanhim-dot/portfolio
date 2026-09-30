const contourPaths = [
  'M-40 420 C180 350 255 500 440 410 S700 335 880 410 S1120 510 1320 400',
  'M-30 455 C160 385 270 530 455 445 S710 370 895 445 S1125 545 1325 435',
  'M-20 490 C150 420 280 560 470 480 S725 405 910 480 S1135 580 1330 470',
  'M-10 525 C145 455 290 590 485 515 S740 440 925 515 S1145 615 1335 505',
  'M0 560 C140 490 300 620 500 550 S755 475 940 550 S1155 650 1340 540',
  'M-35 90 C150 155 255 50 440 115 S710 190 875 115 S1110 45 1310 125',
  'M-25 125 C145 190 270 85 455 150 S720 225 890 150 S1120 80 1320 160',
];

export function Fallback() {
  return (
    <div className="topo-fallback" aria-hidden="true">
      <svg
        className="topo-fallback__contours"
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
      >
        {contourPaths.map((path) => (
          <path d={path} key={path} />
        ))}
      </svg>
    </div>
  );
}
