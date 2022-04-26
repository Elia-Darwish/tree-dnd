import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function ChevronRight(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function ChevronDoubleRight(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
  )
}

function Spinner(props: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M29 0H27V12H29V0Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.9419152276295133s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path d="M41.8977 3.67195L40.1268 2.74251L34.5501 13.368L36.321 14.2974L41.8977 3.67195Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.8634222919937206s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path d="M51.6116 12.9172L50.4755 11.2712L40.5997 18.088L41.7358 19.734L51.6116 12.9172Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.7849293563579278s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path d="M55.9164 25.6177L55.6753 23.6323L43.7628 25.0787L44.0039 27.0641L55.9164 25.6177Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.706436420722135s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path d="M53.8259 38.864L54.5351 36.9939L43.3149 32.7387L42.6057 34.6087L53.8259 38.864Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.6279434850863422s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path d="M45.8189 49.6214L47.3159 48.2952L39.3585 39.3131L37.8615 40.6393L45.8189 49.6214Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.5494505494505494s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path d="M33.7299 55.4257L35.6718 54.9471L32.8 43.2957L30.8581 43.7744L33.7299 55.4257Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.47095761381475665s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path d="M20.3282 54.9471L22.2701 55.4257L25.1419 43.7744L23.2 43.2957L20.3282 54.9471Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.3924646781789639s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path d="M8.68405 48.2952L10.1811 49.6214L18.1385 40.6393L16.6415 39.313L8.68405 48.2952Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.3139717425431711s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path d="M1.46494 36.9939L2.17415 38.864L13.3943 34.6087L12.6851 32.7387L1.46494 36.9939Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.23547880690737832s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path
        d="M0.324692 23.6323L0.0836182 25.6177L11.9961 27.0641L12.2372 25.0787L0.324692 23.6323Z"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.15698587127158556s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path d="M5.52451 11.2712L4.38838 12.9172L14.2642 19.734L15.4003 18.088L5.52451 11.2712Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="-0.07849293563579278s"
          repeatCount="indefinite"
        ></animate>
      </path>
      <path d="M15.8732 2.7425L14.1023 3.67195L19.679 14.2974L21.4499 13.368L15.8732 2.7425Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1.0204081632653061s"
          begin="0s"
          repeatCount="indefinite"
        ></animate>
      </path>
    </svg>
  )
}

function Moon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}

function Sun(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

export { ChevronRight, ChevronDoubleRight, Spinner, Sun, Moon }
