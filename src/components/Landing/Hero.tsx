import { Trans } from "@lingui/macro";
import cx from "classnames";
import Link from "next/link";

import { Button } from "@components/Basic/Button";

const WavesAnimation = ({ className }: { className?: string }) => {
  const paths = [
    "M418.03 102.06c10.3-1.2 20.72-1.5 31.23-.9 10.51 1.03 21.07 2.95 31.6 5.7 10.46 3.13 20.77 7.02 30.81 11.59 9.79 4.81 19.1 10.21 27.76 16.09 8.17 5.96 15.45 12.31 21.65 18.96 5.51 6.59 9.81 13.4 12.83 20.37 2.42 6.8 3.74 13.72 4.13 20.73.4 6.78.5 13.63.73 20.55 1.36 6.69 3.75 13.46 7.63 20.33 6.04 6.66 14.1 13.46 24.26 20.4 12.2 6.78 25.92 13.74 40.52 20.91 14.77 7.05 28.69 14.35 40.71 21.9 9.47 7.47 15.41 15.22 17.25 23.26-1.83 8-7.54 16.3-16.45 24.92-10.34 8.59-21.42 17.5-31.78 26.75-7.62 9.23-12 18.8-12.37 28.7 4.23 9.91 11.95 19.93 22.02 30.04 11.67 10.13 22.79 20.35 31.93 30.64 6.66 10.31 9.35 20.69 7.79 31.1-5.32 10.42-14.41 20.86-26.42 31.26-13.79 10.38-28.53 20.68-43.19 30.84-13.63 10.07-25.65 19.92-35.65 29.47-7.58 9.35-12.97 18.3-16.46 26.74-1.52 8.11-1.94 15.6-1.83 22.36 1 9.05-.92 21.96-5.31 25.61-4.21 1.63-9.77 2.33-16.56 2.14-7.53-.48-16.05-1.66-25.32-3.45-9.73-1.73-19.95-3.78-30.47-6-10.72-1.72-21.55-3.3-32.37-4.6-10.86-.4-21.63-.28-32.23.42a263.627 263.627 0 00-31.17 7.25c-10.19 3.98-19.94 8.24-29.3 12.61-9.4 4.84-18.45 9.41-27.2 13.51-8.85 4.02-17.48 7.23-25.94 9.5-8.66 1.75-17.25 2.35-25.83 1.75-8.86-1.35-17.8-3.94-26.84-7.72-9.37-4.53-18.87-10.15-28.48-16.77-9.83-7.2-19.66-15.23-29.41-23.93a445.889 445.889 0 01-27.94-28.57c-8.46-10.08-16.18-20.4-23-30.84-6.15-10.43-11.3-20.9-15.41-31.36-3.53-10.35-6.2-20.65-8.13-30.86-1.84-10.09-3.35-20.11-4.73-30.04-1.89-9.81-4.01-19.57-6.43-29.28-3.21-9.62-6.73-19.23-10.43-28.81-4.13-9.54-8.03-19.08-11.42-28.63-3.04-9.53-5.07-19.07-5.86-28.62.06-9.55 1.45-18.88 4.02-27.97 3.11-9.09 6.98-17.93 11.31-26.51 4.12-8.56 8.23-16.85 12.14-24.83 3.16-7.95 5.99-15.59 8.5-22.88 1.83-7.26 3.62-14.18 5.52-20.72 1.77-6.53 4.07-12.7 7.07-18.5 3.43-5.83 7.81-11.31 13.17-16.45 6.04-5.23 13.05-10.16 20.9-14.82 8.4-4.82 17.44-9.42 26.95-13.83 9.74-4.65 19.72-9.18 29.82-13.59 10.01-4.71 20-9.36 29.9-13.95 9.67-4.92 19.24-9.78 28.71-14.56 9.22-5.08 18.41-10.04 27.61-14.82 9.01-4.96 18.12-9.65 27.38-14 9.16-4.34 18.54-8.21 28.2-11.51 9.62-3.09 19.57-5.48 29.87-7.07",
    "M441.996 114.97c10.04-.493 20.008-.13 29.846 1.096 9.78 1.633 19.4 4.097 28.754 7.354a182.676 182.676 0 0126.458 12.876c8.095 5.183 15.542 10.892 22.195 17.036 6.217 6.224 11.49 12.771 15.732 19.557 3.735 6.73 6.416 13.616 8.088 20.611 1.41 6.846 2.084 13.781 2.252 20.77.58 6.828 1.274 13.754 2.482 20.777 2.56 6.917 6.33 14 11.65 21.283 7.309 7.223 16.385 14.691 27.17 22.4 12.28 7.665 25.507 15.556 39.02 23.638 13.163 7.947 25.045 16.014 34.745 24.158 7.103 7.87 10.787 15.76 10.651 23.64-3.354 7.602-10.09 15.246-19.518 22.991-10.455 7.643-21.39 15.562-31.498 23.84-7.514 8.452-12.058 17.434-13.003 26.981 3.244 9.853 9.653 20.02 18.242 30.421 10.183 10.534 20.052 21.115 28.332 31.625 6.254 10.386 9.063 20.57 8.072 30.484-4.422 9.673-12.443 19.06-23.422 28.17-12.982 8.928-27.321 17.64-42.076 26.13-14.298 8.414-27.55 16.64-39.254 24.646-9.722 7.925-17.48 15.558-23.384 22.8-3.927 7.05-6.503 13.575-8.161 19.453-2.077 13.367-11.423 22.772-18.57 22.187-5.728-.926-12.413-2.521-19.928-4.696-7.963-2.086-16.546-4.477-25.608-7.032-9.327-2.072-18.974-4.016-28.8-5.713a306.994 306.994 0 00-30.131-1.176 295.579 295.579 0 00-30.445 4.948c-10.17 3.06-20.05 6.383-29.644 9.806-9.656 3.859-19.066 7.495-28.236 10.727-9.268 3.195-18.355 5.67-27.293 7.315-9.087 1.193-18.09 1.35-27.057.415-9.14-1.598-18.29-4.34-27.45-8.194-9.323-4.548-18.642-10.149-27.923-16.699-9.292-7.112-18.418-15.025-27.275-23.61-8.61-8.96-16.745-18.406-24.25-28.239-6.975-9.976-13.131-20.185-18.357-30.509-4.574-10.318-8.184-20.668-10.845-30.971-2.204-10.23-3.672-20.39-4.565-30.457-.929-9.99-1.663-19.897-2.381-29.732-1.314-9.787-2.902-19.533-4.833-29.233-2.714-9.695-5.72-19.371-8.879-28.998-3.54-9.623-6.824-19.208-9.571-28.705-2.38-9.471-3.752-18.842-3.92-28.096.71-9.203 2.698-18.055 5.825-26.566 3.717-8.48 8.173-16.635 13.097-24.478 4.786-7.852 9.57-15.414 14.163-22.669 3.894-7.303 7.427-14.322 10.587-21.016 2.452-6.754 4.74-13.179 7.004-19.254 2.005-6.104 4.375-11.851 7.27-17.22 3.19-5.4 7.194-10.43 12.055-15.1 5.477-4.735 11.883-9.145 19.141-13.253 7.848-4.238 16.412-8.245 25.552-12.04 9.497-4.021 19.364-7.896 29.454-11.654a2324.47 2324.47 0 0130.739-11.954c10.183-4.233 20.302-8.4 30.345-12.493 9.891-4.354 19.714-8.583 29.493-12.634 9.641-4.211 19.292-8.14 28.979-11.727 9.605-3.562 19.297-6.667 29.11-9.192 9.768-2.328 19.688-3.963 29.764-4.825",
    "M460.92 129.245c9.673.171 19.05 1.139 28.105 2.879 8.971 2.122 17.56 5.008 25.696 8.607 7.976 3.93 15.398 8.498 22.185 13.623 6.513 5.349 12.274 11.156 17.205 17.33 4.586 6.257 8.264 12.79 11.027 19.514 2.485 6.686 4.131 13.515 5.056 20.444.98 6.825 1.572 13.757 2.05 20.784 1.152 6.961 2.747 14.086 5.092 21.398 3.778 7.324 8.803 14.906 15.28 22.784 8.185 7.94 17.802 16.183 28.669 24.725 11.85 8.52 24.105 17.25 36.13 26.098 11.27 8.62 20.95 17.205 28.294 25.661 4.813 8.006 6.384 15.794 4.488 23.313-4.65 7.076-12.188 13.995-21.961 20.87-10.433 6.75-21.11 13.74-30.929 21.143-7.36 7.732-12.049 16.146-13.52 25.3 2.29 9.699 7.43 19.872 14.583 30.392 8.726 10.743 17.316 21.528 24.675 32.157 5.745 10.401 8.568 20.397 8.039 29.887-3.566 9.039-10.51 17.537-20.338 25.515-11.93 7.619-25.49 14.844-39.86 21.733-14.413 6.751-28.3 13.294-41.105 19.607-11.3 6.314-20.942 12.41-28.904 18.198-8.458 8.425-17.45 22.46-19.863 27.572-5.095 5.155-20.548 3.517-29.053.32-6.342-2.214-13.367-4.736-20.984-7.434a471.673 471.673 0 00-25.051-6.384 299.279 299.279 0 00-27.657-2.472c-9.602.475-19.374 1.431-29.266 2.814-9.996 2.177-19.869 4.563-29.574 7.044-9.795 2.902-19.438 5.583-28.93 7.912-9.56 2.32-18.982 4.012-28.286 4.953-9.383.567-18.663.199-27.866-1.148-9.261-1.92-18.445-4.891-27.524-8.887-9.093-4.604-18.027-10.185-26.744-16.654-8.575-6.975-16.8-14.707-24.58-23.084-7.4-8.697-14.189-17.872-20.22-27.394-5.466-9.664-10.064-19.539-13.728-29.513a186.378 186.378 0 01-6.6-29.924c-1.008-9.9-1.428-19.747-1.416-29.512-.154-9.729-.223-19.414-.38-29.052-.809-9.67-1.923-19.322-3.404-28.956-2.22-9.688-4.715-19.365-7.338-28.99-2.935-9.637-5.599-19.187-7.717-28.598-1.734-9.346-2.473-18.511-2.034-27.438 1.281-8.808 3.81-17.165 7.431-25.095 4.216-7.855 9.165-15.324 14.587-22.422 5.345-7.13 10.707-13.954 15.907-20.488 4.558-6.635 8.744-13 12.53-19.108 3.065-6.221 5.867-12.156 8.535-17.787 2.316-5.711 4.827-11.092 7.69-16.11 3.023-5.065 6.699-9.755 11.09-14.08 4.923-4.372 10.696-8.39 17.271-12.093 7.174-3.789 15.1-7.32 23.638-10.623 9.007-3.468 18.486-6.779 28.29-9.952a1441.033 1441.033 0 0130.617-9.986 2497.373 2497.373 0 0131.108-10.31c10.297-3.588 20.524-7.045 30.663-10.302 10.077-3.398 20.097-6.53 30.046-9.31 9.896-2.756 19.758-5.063 29.583-6.82 9.776-1.56 19.54-2.467 29.262-2.643",
    "M474.732 144.015c9.184.765 17.902 2.228 26.132 4.384 8.114 2.51 15.683 5.7 22.66 9.5 6.802 4.1 12.938 8.772 18.349 13.912 5.183 5.348 9.593 11.102 13.19 17.162a89.796 89.796 0 017.785 19.141c1.754 6.596 2.926 13.332 3.67 20.201 1.033 6.86 1.982 13.876 3.108 21.062a153.928 153.928 0 008.041 22.47c4.824 7.878 10.819 16.11 18.07 24.684 8.596 8.698 18.243 17.735 28.674 27.032 10.939 9.264 21.82 18.648 32.05 28.024 9.187 9.04 16.58 17.86 21.609 26.355 2.642 7.89 2.309 15.347-1.107 22.346-5.712 6.454-13.859 12.621-23.794 18.64-10.29 5.91-20.653 12.062-30.13 18.66-7.184 7.068-11.98 14.926-13.945 23.648 1.408 9.446 5.345 19.497 11.126 29.964 7.287 10.79 14.607 21.619 20.99 32.236 5.173 10.347 7.896 20.147 7.73 29.255-2.802 8.522-8.672 16.282-17.278 23.302-10.702 6.497-23.203 12.415-36.794 17.832-14.022 5.191-27.958 10.074-41.274 14.691-12.277 4.636-23.265 9.078-32.8 13.28-7.953 4.265-14.489 8.22-19.774 11.78-9.147 8.305-19.055 13.245-23.382 12.009-5.304-2.07-19.877-8.697-29.056-12.632a378.144 378.144 0 00-21.506-6.634 300.32 300.32 0 00-25.051-3.466c-8.94-.048-18.191.266-27.729.908-9.69 1.355-19.393 2.862-29.057 4.428-9.758 1.954-19.46 3.696-29.083 5.118-9.658 1.444-19.234 2.313-28.689 2.522-9.464-.079-18.809-1.001-28.006-2.802-9.155-2.283-18.14-5.502-26.897-9.632-8.615-4.653-16.94-10.184-24.897-16.516a193.525 193.525 0 01-21.408-22.24c-6.094-8.295-11.482-17.02-16.048-26.05-3.988-9.152-7.108-18.485-9.328-27.911a180.532 180.532 0 01-2.828-28.315c.003-9.399.454-18.783 1.202-28.125.477-9.368.936-18.74 1.227-28.098a392.07 392.07 0 00-2.142-28.464c-1.76-9.614-3.749-19.216-5.828-28.776-2.342-9.575-4.381-19.034-5.88-28.295-1.09-9.163-1.226-18.06-.236-26.623 1.823-8.394 4.82-16.25 8.85-23.587 4.639-7.217 9.981-13.997 15.8-20.377 5.802-6.394 11.65-12.482 17.368-18.291 5.142-5.943 9.93-11.665 14.311-17.158 3.674-5.675 7.01-11.116 10.13-16.307 4.047-7.845 13.026-22.077 18.765-28.372 4.425-4.123 9.58-7.885 15.48-11.312 6.455-3.482 13.636-6.676 21.454-9.6 8.338-3.057 17.193-5.901 26.472-8.583 9.626-2.863 19.52-5.596 29.606-8.217a1465.25 1465.25 0 0130.905-8.224c10.392-2.811 20.735-5.49 30.973-7.965 10.24-2.578 20.38-4.89 30.38-6.875 9.972-1.95 19.81-3.468 29.49-4.488 9.628-.827 19.087-1.056 28.34-.613",
    "M483.967 158.518c8.608 1.266 16.63 3.153 24.051 5.637 7.29 2.8 13.933 6.172 19.905 10.068 5.793 4.188 10.877 8.847 15.228 13.918a82.987 82.987 0 0110.332 16.8c2.607 6.023 4.571 12.287 5.99 18.747 1.512 6.529 2.665 13.256 3.652 20.163 1.43 6.995 3.008 14.23 4.954 21.707 2.833 7.65 6.365 15.618 10.774 23.934 5.567 8.527 12.147 17.44 19.693 26.717 8.517 9.412 17.697 19.12 27.23 29.015 9.612 9.802 18.802 19.587 27.017 29.213 7.004 9.172 12.144 17.95 14.979 26.205.654 7.55-1.361 14.504-6.036 20.864-6.556 5.774-15.095 11.17-25.045 16.367-10.046 5.136-20.02 10.523-29.12 16.382-7.003 6.456-11.88 13.767-14.284 22.025.574 9.12 3.39 18.91 7.871 29.173 5.919 10.69 11.987 21.402 17.392 31.89 4.536 10.217 7.052 19.785 7.154 28.56-2.145 8.083-7.01 15.242-14.388 21.485-9.384 5.578-20.608 10.395-33.108 14.55-13.21 3.803-26.694 7.184-39.952 10.214-12.654 2.997-24.385 5.792-34.97 8.368a931.02 931.02 0 00-24.157 7.336c-13.177 5.198-25.952 7.535-29.967 6.049-4.495-2.094-16.492-8.444-24.161-12.228a323.61 323.61 0 00-18.492-6.608c-7.006-1.582-14.531-2.992-22.535-4.187-8.238-.492-16.913-.736-25.987-.753-9.243.602-18.62 1.31-28.058 2.01-9.544 1.067-19.1 1.92-28.62 2.473-9.546.607-19.011.686-28.361.184-9.298-.716-18.433-2.176-27.357-4.398a146.196 146.196 0 01-25.48-10.267c-7.931-4.641-15.431-10.052-22.433-16.142a150.87 150.87 0 01-17.919-21.017 141.43 141.43 0 01-11.976-24.241 138.216 138.216 0 01-5.358-25.811c-.552-8.729-.423-17.51.307-26.283.793-8.808 1.92-17.622 3.229-26.447.945-8.94 1.797-17.917 2.448-26.953-.02-9.2-.366-18.462-1.06-27.783-1.306-9.468-2.809-18.94-4.363-28.344-1.749-9.45-3.178-18.746-4.066-27.79-.478-8.915-.04-17.503 1.474-25.674a82.774 82.774 0 0110.071-22.038c4.97-6.587 10.623-12.695 16.753-18.363 6.161-5.669 12.398-11.025 18.538-16.117 5.653-5.244 10.971-10.304 15.892-15.177a416.47 416.47 0 0011.75-14.752c4.63-7.28 13.932-20.7 19.368-26.705 4.037-3.942 8.682-7.542 13.958-10.802 5.755-3.298 12.188-6.276 19.243-8.958 7.55-2.768 15.659-5.28 24.23-7.586 8.96-2.433 18.279-4.698 27.851-6.797a975.73 975.73 0 0129.81-6.365 940.555 940.555 0 0130.363-5.798c10.122-1.805 20.109-3.356 29.921-4.594 9.818-1.185 19.426-1.972 28.778-2.302 9.31-.155 18.349.236 27.037 1.224",
    "M489.652 172.29c7.98 1.712 15.315 3.93 21.995 6.655 6.541 3.014 12.4 6.523 17.556 10.466 5.014 4.21 9.323 8.833 12.948 13.81a83.98 83.98 0 018.629 16.484c2.246 5.94 4.027 12.136 5.445 18.562 1.62 6.573 3.093 13.402 4.58 20.48 2.003 7.27 4.288 14.844 7.037 22.75 3.568 8.143 7.814 16.673 12.832 25.595 5.944 9.155 12.651 18.698 20.016 28.569 7.975 9.977 16.23 20.153 24.465 30.408 7.998 10.06 15.277 19.962 21.398 29.535 4.825 9.01 7.807 17.47 8.618 25.26-1.099 7.011-4.53 13.325-10.224 18.955-7.164 5.047-15.915 9.69-25.736 14.111-9.73 4.433-19.277 9.125-27.976 14.321-6.79 5.887-11.732 12.658-14.52 20.411-.18 8.714 1.604 18.14 4.876 28.071 4.624 10.428 9.487 20.901 13.917 31.13 3.843 10.002 6.087 19.31 6.346 27.759-1.592 7.714-5.54 14.392-11.738 20.028-8.038 4.875-17.866 8.824-29.042 11.947-12.085 2.671-24.704 4.763-37.41 6.396a1210.935 1210.935 0 01-35.469 3.817c-10.15 1.146-19.212 2.117-27.183 2.87-9.843 1.238-23.954 2.29-29.131 1.824-8.65-2.905-23.675-11.097-30.328-14.707a317.01 317.01 0 00-16.216-6.488c-6.226-1.673-13.017-3.255-20.318-4.727-7.57-.856-15.619-1.57-24.133-2.177-8.712-.04-17.62-.068-26.654-.131-9.136.272-18.331.33-27.515.095-9.189-.163-18.294-.786-27.263-1.922-8.876-1.274-17.527-3.189-25.905-5.76-8.175-2.858-15.982-6.402-23.36-10.619a125.372 125.372 0 01-19.518-15.471 115.51 115.51 0 01-14.338-19.415 109.418 109.418 0 01-8.19-22.022c-1.436-7.679-2.091-15.485-2.019-23.386.378-7.948 1.312-15.959 2.727-24.005 1.377-8.145 2.968-16.35 4.647-24.62 1.276-8.449 2.41-17.004 3.306-25.667a405.76 405.76 0 00-.14-26.956c-.902-9.25-1.936-18.518-2.971-27.721-1.17-9.243-2.009-18.289-2.308-27.062.11-8.611 1.075-16.823 3.054-24.577a78.74 78.74 0 0111.115-20.45c5.224-5.973 11.106-11.417 17.448-16.404 6.42-4.968 12.954-9.608 19.426-13.992 6.082-4.54 11.861-8.924 17.278-13.164a373.925 373.925 0 0013.323-13.127c5.318-6.664 15.278-19.227 20.606-24.96 3.8-3.813 8.064-7.294 12.844-10.437 5.15-3.198 10.893-6.062 17.2-8.61 6.766-2.604 14.063-4.917 21.834-6.98 8.177-2.128 16.738-4.05 25.601-5.755a656.822 656.822 0 0127.985-4.876 718.57 718.57 0 0128.948-3.958c9.706-1.128 19.3-2.01 28.705-2.577 9.415-.51 18.601-.657 27.483-.384 8.832.437 17.327 1.357 25.407 2.795",
    "M493.098 185.292c7.335 2.053 14.025 4.56 20.065 7.488 5.903 3.185 11.134 6.79 15.71 10.78a77.226 77.226 0 0111.471 13.786c3.128 5.159 5.744 10.625 7.89 16.383 2.21 5.953 4.102 12.2 5.79 18.73 1.948 6.732 3.881 13.788 5.954 21.17 2.574 7.63 5.5 15.625 8.861 24.015 4.066 8.652 8.7 17.725 13.927 27.185 5.894 9.683 12.276 19.696 19.017 29.959 7.01 10.296 13.994 20.678 20.647 30.989 6.194 10.016 11.467 19.716 15.494 28.943 2.747 8.585 3.744 16.48 2.77 23.609-2.589 6.335-7.17 11.906-13.62 16.755-7.562 4.327-16.355 8.242-25.94 11.943-9.339 3.79-18.42 7.86-26.698 12.457-6.563 5.347-11.533 11.587-14.655 18.812-.86 8.244-.013 17.201 2.153 26.687 3.42 10.04 7.151 20.142 10.636 30.013 3.128 9.688 5.029 18.692 5.345 26.808-1.172 7.401-4.327 13.701-9.425 18.885-6.73 4.351-15.13 7.664-24.872 10.033-10.732 1.792-22.168 2.883-33.932 3.388-11.84.306-23.417.248-34.459-.096-10.43-.266-20.036-.708-28.734-1.313-7.815-.426-14.74-1.022-20.82-1.818-7.647-1.063-19.569-4.424-24.604-6.856-4.753-2.524-15.208-8.8-21.35-12.332a357.827 357.827 0 00-14.727-6.456c-5.648-1.754-11.828-3.494-18.508-5.197a771.23 771.23 0 00-22.297-3.383c-8.122-.619-16.455-1.256-24.93-1.968-8.584-.422-17.22-1.042-25.842-1.94-8.621-.801-17.143-1.995-25.485-3.634-8.216-1.726-16.162-3.977-23.768-6.765-7.367-2.977-14.297-6.536-20.716-10.622-6.065-4.31-11.543-9.145-16.35-14.424-4.366-5.475-8.024-11.333-10.902-17.51a85.296 85.296 0 01-4.917-19.574c-.468-6.802-.258-13.748.607-20.784 1.04-7.132 2.536-14.354 4.392-21.666 1.734-7.456 3.606-15.047 5.486-22.754a448.98 448.98 0 003.806-24.333c.477-8.537.679-17.22.627-25.994-.504-8.99-1.093-17.985-1.634-26.914-.623-8.945-.897-17.688-.654-26.122.664-8.244 2.128-16.051 4.522-23.341a75.594 75.594 0 0111.968-18.86c5.409-5.362 11.439-10.18 17.905-14.507 6.603-4.288 13.335-8.231 20.051-11.919 6.41-3.859 12.566-7.568 18.404-11.158a378.483 378.483 0 0014.827-11.398c6.032-5.97 16.935-17.543 22.39-22.961 5.741-5.345 19.476-14.635 27.729-18.519 6.025-2.518 12.546-4.726 19.522-6.651 7.341-1.959 15.078-3.652 23.12-5.097a439.995 439.995 0 0125.672-3.795 512.66 512.66 0 0126.91-2.525c9.083-.593 18.07-.922 26.882-.957 8.829.049 17.425.443 25.723 1.207 8.233.932 16.107 2.295 23.557 4.114",
    "M495.656 197.841c6.708 2.348 12.81 5.086 18.314 8.195 5.367 3.341 10.132 7.063 14.315 11.13a83.51 83.51 0 0110.647 13.938c2.998 5.213 5.589 10.74 7.848 16.588 2.35 6.08 4.507 12.497 6.569 19.239 2.332 7 4.728 14.365 7.297 22.106a712.585 712.585 0 0010.048 25.289c4.233 9.102 8.875 18.583 13.905 28.42 5.432 9.997 11.085 20.237 16.828 30.628 5.744 10.324 11.204 20.585 16.124 30.647 4.297 9.659 7.6 18.863 9.633 27.474.847 7.904.095 15.063-2.38 21.373-3.804 5.55-9.266 10.322-16.224 14.39-7.764 3.603-16.45 6.832-25.692 9.889-8.897 3.219-17.476 6.734-25.328 10.776-6.337 4.835-11.3 10.556-14.695 17.224-1.456 7.71-1.444 16.13-.258 25.07 2.314 9.545 4.988 19.16 7.565 28.574 2.419 9.307 3.928 17.943 4.205 25.723-.87 7.106-3.364 13.111-7.482 17.959-5.515 4.005-12.528 6.909-20.803 8.76-9.266 1.203-19.33 1.59-29.867 1.27-10.835-.628-21.653-1.713-32.2-3.152-10.233-1.451-19.88-3.11-28.836-4.93-8.321-1.65-15.883-3.424-22.672-5.327-8.92-2.585-23.179-8.269-29.12-11.453-5.455-3.072-16.477-9.876-22.516-13.51-6.583-3.236-22.055-9.47-31.079-12.35a1054.44 1054.44 0 00-20.555-4.45 1715.72 1715.72 0 01-22.982-3.484 436.399 436.399 0 01-23.754-3.547 250.805 250.805 0 01-23.168-4.913c-7.398-2.016-14.483-4.465-21.162-7.332-6.44-2.975-12.386-6.402-17.778-10.245-5.058-3.982-9.472-8.355-13.21-13.08-4.64-7.436-9.673-23.748-10.102-32.45.223-5.943 1.062-12.02 2.434-18.221 1.442-6.332 3.264-12.801 5.35-19.4 1.895-6.816 3.863-13.809 5.805-20.985a416.158 416.158 0 004.017-23.002c.63-8.156 1.04-16.497 1.262-24.95-.14-8.649-.314-17.316-.406-25.905-.1-8.593.155-16.96.91-24.992 1.151-7.817 3.062-15.17 5.816-21.977a72.766 72.766 0 0112.65-17.245c5.526-4.783 11.625-8.985 18.147-12.687 6.69-3.634 13.536-6.923 20.396-9.943 6.645-3.17 13.094-6.208 19.27-9.141a436.911 436.911 0 0016.18-9.578c6.763-5.185 18.823-15.57 24.575-20.584 5.785-5.075 18.823-14.049 26.36-17.863 5.429-2.473 11.283-4.638 17.527-6.49 6.556-1.867 13.472-3.45 20.696-4.741 7.502-1.301 15.232-2.332 23.143-3.106a374.87 374.87 0 0124.505-1.499c8.31-.207 16.554-.122 24.659.264 8.115.471 16.023 1.285 23.644 2.444 7.57 1.314 14.799 3.034 21.617 5.157",
    "M498.452 210.605c6.11 2.576 11.696 5.53 16.754 8.813 7.138 5.439 18.82 18.379 23.534 25.87 2.977 5.34 5.663 11.026 8.124 17.068 2.544 6.284 4.976 12.934 7.382 19.96 2.627 7.294 5.336 14.983 8.215 23.076 3.207 8.36 6.657 17.122 10.36 26.27a2512.39 2512.39 0 0012.771 29.024c4.624 10.048 9.24 20.222 13.714 30.414 4.276 10.018 8.09 19.85 11.233 29.34 2.463 9.014 3.916 17.471 4.15 25.24-.811 7.06-3.028 13.313-6.71 18.723-4.74 4.704-10.802 8.656-18.056 11.948-7.775 2.938-16.236 5.537-25.052 8.006-8.4 2.709-16.475 5.73-23.884 9.266-6.085 4.362-11.018 9.56-14.623 15.67-1.974 7.14-2.68 14.953-2.36 23.274 1.32 8.951 3.033 17.988 4.769 26.86 1.712 8.834 2.788 17.065 2.954 24.471-1.674 9.697-13.254 22.334-22.98 25.232-7.79.883-16.393.848-25.551.023-9.581-1.221-19.334-3.013-29.02-5.248-9.613-2.33-18.872-4.923-27.642-7.726-8.379-2.673-16.16-5.467-23.304-8.353-6.686-2.656-12.766-5.39-18.307-8.21-7.542-3.884-20.604-11.78-26.623-15.826-5.982-3.713-18.74-11.134-25.822-14.774a566.283 566.283 0 00-16.15-6.325 1261.204 1261.204 0 00-18.964-5.394 1599.514 1599.514 0 01-20.956-4.715 423.377 423.377 0 01-21.406-4.75c-7.075-1.649-13.949-3.56-20.565-5.746-6.497-2.17-12.624-4.66-18.328-7.465-7.96-4.457-20.637-15.057-25.146-21.116-3.322-6.42-6.1-20.414-5.655-27.871 1.284-7.79 6.097-24.377 9.17-33.236a1071.957 1071.957 0 005.71-19.368 419.661 419.661 0 004.005-21.725c.744-7.777 1.322-15.742 1.794-23.821.177-8.266.387-16.547.732-24.742.365-8.17 1.102-16.106 2.319-23.679 1.594-7.345 3.885-14.203 6.956-20.496a69.588 69.588 0 0113.15-15.642c5.562-4.209 11.667-7.837 18.17-10.952 6.687-3.012 13.559-5.682 20.479-8.072 6.784-2.512 13.427-4.877 19.856-7.164 6.067-2.575 11.843-5.122 17.314-7.672 7.457-4.323 20.765-13.275 26.96-17.756 6.02-4.653 18.849-13.127 25.938-16.795 4.994-2.414 10.326-4.52 15.965-6.324 5.882-1.816 12.075-3.318 18.543-4.527 6.683-1.192 13.605-2.09 20.687-2.698a271.62 271.62 0 0122.005-.834c7.479.057 14.92.434 22.263 1.115 7.337.785 14.516 1.895 21.456 3.363 6.864 1.608 13.436 3.601 19.664 5.99",
    "M502.209 224.36c5.551 2.782 10.67 5.917 15.352 9.39a94.816 94.816 0 0112.464 12.08c3.657 4.58 6.975 9.52 10.004 14.816 2.992 5.518 5.768 11.411 8.386 17.672 2.684 6.509 5.283 13.402 7.878 20.69 2.748 7.535 5.556 15.476 8.467 23.803 3.124 8.558 6.373 17.47 9.738 26.714a2981.53 2981.53 0 0110.7 28.814c3.56 9.773 6.949 19.557 10.007 29.234 2.738 9.404 4.907 18.501 6.344 27.159.776 8.121.571 15.62-.733 22.383-2.18 6.082-5.56 11.366-10.147 15.825-5.388 3.844-11.81 7.001-19.138 9.567-7.638 2.312-15.754 4.346-24.067 6.31-7.896 2.259-15.443 4.836-22.406 7.918-5.822 3.91-10.682 8.59-14.441 14.117-2.396 6.544-3.71 13.71-4.15 21.358.45 8.278 1.296 16.675 2.264 24.925 1.046 8.295 1.667 16.053 1.659 23.064-1.413 9.29-10.661 21.481-18.515 24.255-6.397.78-13.55.593-21.273-.436-8.217-1.505-16.705-3.656-25.281-6.343a333.109 333.109 0 01-25.42-9.563c-8.045-3.426-15.661-6.997-22.784-10.663-6.837-3.482-13.173-7.003-19.04-10.553-8.187-4.972-22.578-14.622-29.136-19.326-6.438-4.293-19.565-12.59-26.542-16.572a699.832 699.832 0 00-15.396-7.087 1751.963 1751.963 0 00-17.513-6.287 1402.193 1402.193 0 01-18.923-5.686 432.29 432.29 0 01-19-5.58c-6.23-1.88-12.208-3.946-17.884-6.188-8.181-3.427-22.122-11.394-27.627-15.943-4.551-4.815-10.178-15.49-11.23-21.28-.146-6.094 2.363-19.234 4.704-26.328 1.621-5.002 3.461-10.217 5.453-15.655 1.747-5.73 3.54-11.724 5.28-17.967a488.718 488.718 0 003.856-20.52c.816-7.383 1.547-14.954 2.224-22.638.483-7.84 1.037-15.678 1.77-23.42.79-7.702 1.955-15.139 3.576-22.216 1.974-6.83 4.587-13.163 7.902-18.93a67.676 67.676 0 0113.466-14.041c5.551-3.662 11.592-6.74 18.004-9.309 6.616-2.443 13.426-4.507 20.312-6.305a856.903 856.903 0 0120.148-5.271c6.298-1.908 12.369-3.796 18.172-5.708 8.057-3.37 22.59-10.664 29.295-14.457 6.412-4.072 19.432-11.722 26.318-15.121 7.22-3.279 23.078-8.442 31.71-10.283 5.988-1.117 12.175-1.914 18.517-2.399 6.46-.46 13.02-.598 19.635-.408 6.667.238 13.332.799 19.92 1.7 6.582.996 13.036 2.332 19.295 4.035 6.185 1.82 12.142 4.034 17.818 6.648",
    "M507.078 239.823c7.394 4.612 20.253 15.871 25.783 22.534 6.886 9.669 12.81 20.883 18.075 33.583 5.374 13.543 10.572 28.681 15.802 45.2 5.576 17.195 11.116 35.435 16.227 54.085 4.537 18.214 7.461 35.685 7.845 51.388-2.03 13.557-7.782 24.341-17.482 31.974-11.983 5.625-26.591 9.305-42.36 12.141-7.347 1.875-14.38 4.059-20.875 6.724-5.56 3.476-10.31 7.653-14.16 12.61-2.737 5.916-4.563 12.412-5.615 19.343-.307 7.565-.214 15.247.05 22.838.778 15.317-.136 28.117-3.737 37.317-6.386 6.593-16.037 8.937-28.169 7.516-14.088-3.442-29.072-9.366-43.824-16.905-14.693-7.685-28.14-15.939-40.055-24.372-11.288-7.598-21.334-15.11-30.437-22.53-9.134-6.316-18.077-12.548-27.121-18.709-7.251-3.978-22.702-11.481-30.915-15.07a1499.018 1499.018 0 01-16.992-6.464 430.955 430.955 0 01-16.677-6.157c-10.837-3.945-20.409-8.374-28.322-13.27-7.382-4.905-12.684-10.402-15.722-16.336-2.333-6.24-2.518-13.042-.786-20.339 1.838-8.022 4.893-16.873 8.636-26.595 2.826-10.988 5.674-23.114 8.281-36.206 1.524-14.212 3.145-28.892 5.287-43.365 1.167-7.174 2.69-14.085 4.66-20.628 2.291-6.271 5.167-12.057 8.676-17.291a65.24 65.24 0 0113.597-12.458c5.479-3.137 11.387-5.712 17.655-7.77 13.074-3.712 26.64-6.244 40.022-8.143 12.617-2.775 24.426-5.619 35.34-8.583 9.858-4.255 19.23-8.478 28.386-12.385 8.846-4.67 18.105-8.622 27.91-11.61 10.093-3.188 20.913-5.194 32.268-5.93 11.624-.652 23.54.035 35.363 2.113a136.096 136.096 0 0117.285 4.547c5.56 2 10.93 4.391 16.093 7.197",
    "M512.746 257.435c9.014 6.332 16.89 14.182 23.72 23.457 6.44 9.9 12.082 21.358 17.109 34.242 4.962 13.592 9.6 28.616 13.944 44.781 4.312 16.527 8.13 33.73 11.055 50.884 2.055 16.428 2.29 31.757.059 45.087-4.31 11.279-11.743 19.886-22.294 25.633-12.093 4.205-26.062 6.824-40.7 8.855-13.048 3.578-24.402 8.929-33.1 16.8-5.08 11.42-7.59 24.477-8.604 37.923-.279 14.096-1.541 26.052-4.616 34.872-5.125 6.626-12.75 9.303-22.427 8.33-11.499-3-24.028-8.661-36.703-16.175a350.89 350.89 0 01-36.69-25.784 540.94 540.94 0 01-30.305-24.927c-9.34-7.186-18.311-14.12-27.11-20.801-9.503-5.72-19.175-11.268-28.958-16.717-10.568-4.648-20.562-9.183-29.713-13.661-9.389-4.123-17.436-8.443-23.887-12.934-8.228-6.92-14.324-22.884-12.648-32.32 1.548-7.277 4.12-15.441 7.298-24.524a1370.004 1370.004 0 007.346-34.212c1.693-13.368 3.709-27.092 6.42-40.526 3.111-13.07 7.897-24.806 14.781-34.54 8.47-8.193 18.852-13.825 30.691-17.257 12.66-2.698 25.876-4.177 39.078-4.985 12.692-1.49 24.82-3 36.188-4.667 10.48-2.875 20.443-5.836 30.046-8.674 9.185-3.682 18.496-6.835 28.048-9.191a130.812 130.812 0 0130.092-4.678 124.9 124.9 0 0131.844 3.019c10.456 2.649 20.553 6.835 30.029 12.683",
    "M518.44 277.216c8.11 6.55 15.27 14.622 21.516 24.077 5.847 9.983 10.946 21.429 15.393 34.16 4.224 13.25 7.915 27.692 11.033 42.935 2.8 15.338 4.763 30.936 5.541 46.1-.193 14.25-2.231 27.139-6.537 37.95-5.958 8.974-14.452 15.506-25.324 19.549-11.833 2.957-24.951 4.674-38.382 6.054-12.012 2.995-22.6 7.615-31.064 14.454-5.588 10.102-9.003 21.647-11.02 33.61-1.245 12.789-2.93 23.83-5.734 32.202-4.201 6.645-10.234 9.742-17.845 9.442-9.18-2.223-19.351-7.149-29.896-14.08-11.175-7.63-22.047-16.289-32.26-25.425a621.885 621.885 0 01-28.771-26.161c-9.152-7.818-17.891-15.32-26.284-22.447-9.065-6.347-18.048-12.39-26.856-18.175-9.541-5.15-18.315-9.976-26.157-14.533-8.113-4.277-14.919-8.509-20.217-12.713-6.897-6.448-11.93-20.958-10.607-29.662 1.118-6.853 3.132-14.58 5.706-23.243 1.91-9.865 4.095-20.748 6.478-32.434 1.85-12.483 4.217-25.197 7.39-37.543 3.62-11.886 8.796-22.439 15.867-31.076 8.397-7.14 18.46-11.842 29.796-14.44 12.11-1.8 24.817-2.351 37.614-2.168 12.55-.292 24.706-.53 36.29-.889 10.883-1.435 21.287-3.02 31.258-4.595 9.528-2.453 18.971-4.55 28.427-6.043 9.36-1.889 18.912-2.866 28.61-2.73a107.83 107.83 0 0129.008 4.208c9.377 2.958 18.462 7.442 27.027 13.616",
    "M523.17 298.639c7.244 6.719 13.609 14.856 19.105 24.276 5.11 9.818 9.434 20.93 13.012 33.107 3.257 12.498 5.78 25.862 7.5 39.676 1.248 13.674 1.426 27.235.305 40.053-2.062 11.839-5.868 22.192-11.618 30.52-7.002 6.793-15.995 11.433-26.726 14.003-11.266 1.922-23.36 2.93-35.556 3.787-10.97 2.489-20.785 6.436-28.927 12.3-5.91 8.792-10.011 18.842-12.848 29.31-2.085 11.414-4.23 21.451-6.943 29.303-3.62 6.569-8.469 10.073-14.448 10.524-7.23-1.26-15.32-5.139-23.844-11.078-9.246-6.784-18.474-14.793-27.341-23.48-9.204-8.62-17.954-17.384-26.137-26.018-8.58-8.1-16.786-15.91-24.603-23.311a1310.614 1310.614 0 00-24.523-19.278c-8.518-5.554-16.206-10.634-22.936-15.303-7.028-4.465-12.83-8.712-17.288-12.816-5.95-6.313-10.607-20.309-9.812-28.756.667-6.673 2.123-14.191 4.157-22.581 1.526-9.449 3.462-19.792 5.773-30.763 2.013-11.574 4.68-23.248 8.234-34.44 3.99-10.671 9.421-20.04 16.537-27.588 8.225-6.118 17.861-9.952 28.606-11.815 11.43-1.002 23.465-.754 35.703.284 12.143.783 24.074 1.716 35.59 2.601 11.028-.013 21.627-.176 31.791-.396 9.762-1.058 19.323-1.9 28.705-2.302 9.202-.868 18.389-.982 27.536-.145 9.007.718 17.951 2.605 26.686 5.812 8.484 3.324 16.645 8.117 24.31 14.514",
    "M525.942 320.76c6.391 6.793 11.895 14.819 16.532 23.909 4.25 9.393 7.651 19.825 10.218 31.025 2.183 11.345 3.476 23.23 3.826 35.21-.187 11.675-1.526 22.95-4.156 33.267-3.455 9.376-8.448 17.275-15.045 23.31-7.485 4.834-16.476 7.86-26.705 9.246-10.45 1.089-21.438 1.562-32.39 2.036-9.933 2.053-18.97 5.373-26.724 10.326-6.057 7.523-10.637 16.12-14.102 25.119-2.78 9.997-5.372 18.958-8.157 26.19-5.32 8.26-20.997 9.708-30.947 3.66-7.467-5.59-15.047-12.533-22.487-20.334-7.89-7.936-15.536-16.212-22.794-24.518a3386.922 3386.922 0 01-22.196-23.211c-7.618-7-14.973-13.636-21.932-19.874-7.535-5.857-14.23-11.167-20.019-15.996-6.098-4.697-11.096-9.09-14.935-13.29-5.267-6.504-9.88-20.786-9.632-29.338.267-6.672 1.276-14.11 2.873-22.306 1.258-9.075 3.042-18.858 5.344-29.09 2.168-10.636 5.077-21.221 8.904-31.25 4.248-9.445 9.815-17.638 16.857-24.123 7.924-5.149 17.049-8.19 27.11-9.395 10.664-.33 21.91.584 33.395 2.335 11.514 1.683 22.974 3.63 34.143 5.626a3332.03 3332.03 0 0031.494 3.649c9.791.4 19.316.905 28.548 1.711 9.024.345 17.887 1.262 26.533 2.959 8.477 1.532 16.743 4.067 24.692 7.757 7.689 3.767 14.991 8.855 21.752 15.39",
    "M525.993 342.264c5.524 6.747 10.141 14.453 13.853 22.956 3.347 8.709 5.793 18.143 7.326 28.034 1.14 9.906 1.322 20.008.474 29.91-1.333 9.531-3.815 18.448-7.496 26.318-4.325 7.052-9.96 12.717-16.865 16.758-7.477 3.19-16.063 4.942-25.514 5.423-9.482.487-19.305.593-29.024.801-8.913 1.682-17.171 4.442-24.46 8.537-6.05 6.313-10.923 13.513-14.833 21.099-3.332 8.57-6.321 16.383-9.25 22.877-4.966 7.952-17.807 11.503-25.66 7.343-5.941-4.229-12.041-9.86-18.118-16.467-6.55-6.88-13.002-14.276-19.214-21.898a1307.423 1307.423 0 01-19.314-22.117c-6.683-6.91-13.11-13.55-19.154-19.855-6.545-6.034-12.315-11.528-17.289-16.566-7.43-7.28-17.652-20.999-20.354-28.096-1.57-5.21-2.223-10.811-2.049-16.878-.008-6.756.692-14.152 2.02-22.143 1.11-8.684 2.831-17.872 5.167-27.314 2.315-9.661 5.42-19.124 9.424-27.969 4.387-8.245 9.94-15.277 16.789-20.743 7.54-4.238 16.068-6.563 25.38-7.208 9.8.218 20.138 1.659 30.743 3.959 10.698 2.385 21.434 5.162 31.998 8.082a4205.162 4205.162 0 0130.337 7.252c9.554 1.779 18.825 3.626 27.75 5.655 8.727 1.615 17.191 3.64 25.309 6.252 7.943 2.445 15.56 5.695 22.743 9.888 6.94 4.228 13.414 9.568 19.281 16.11",
    "M522.903 361.732c4.667 6.553 8.402 13.757 11.22 21.452 2.488 7.818 4.033 16.027 4.644 24.392.246 8.293-.481 16.495-2.197 24.292-2.138 7.42-5.334 14.103-9.577 19.744-4.717 5.013-10.486 8.788-17.238 11.236-7.09 1.9-14.988 2.7-23.48 2.575-8.42.095-17.056-.028-25.6.016-7.929 1.367-15.392 3.621-22.172 6.945-5.902 5.177-10.875 11.075-15.054 17.294-3.716 7.173-7.035 13.804-10.13 19.465-4.847 7.377-15.836 12.42-22.158 9.96-4.748-2.895-9.615-7.14-14.51-12.423-5.316-5.591-10.615-11.866-15.775-18.528a643.617 643.617 0 01-16.279-20.172c-5.677-6.56-11.142-13-16.275-19.232-5.563-6.04-10.464-11.663-14.688-16.887-6.343-7.661-15.265-22.422-17.761-30.07-1.499-5.543-2.211-11.413-2.2-17.67-.108-6.811.462-14.108 1.653-21.844 1.103-8.203 2.843-16.719 5.238-25.302 2.454-8.644 5.685-16.98 9.778-24.642 4.407-7.069 9.841-12.998 16.386-17.494 7.05-3.408 14.922-5.103 23.411-5.265 8.884.648 18.24 2.455 27.84 5.13 9.732 2.88 19.556 6.236 29.28 9.85a1419.188 1419.188 0 0128.334 10.163c9.036 2.977 17.806 6.002 26.203 9.149 8.244 2.799 16.15 5.89 23.65 9.385 7.327 3.344 14.25 7.278 20.66 11.908a88.324 88.324 0 0116.797 16.573",
    "M516.74 377.861a80.927 80.927 0 018.737 19.498 78.487 78.487 0 012.402 20.457c-.415 6.666-1.759 13.041-3.999 18.854-4.32 7.88-17.874 18.537-26.893 20.951-6.428.995-13.458 1.163-20.875.698-7.327-.125-14.81-.35-22.212-.391-6.977 1.102-13.659 2.904-19.872 5.523-5.63 4.14-10.542 8.827-14.827 13.773-5.702 8.548-15.562 22.562-20.301 26.537-5.15 1.795-16.265-2.508-22.177-7.973-4.294-4.292-8.579-9.33-12.783-14.902-4.563-5.615-9.039-11.554-13.357-17.64a452.203 452.203 0 01-13.448-18.036c-4.593-5.882-8.65-11.491-12.15-16.856-3.727-5.34-6.82-10.542-9.263-15.675-2.567-5.256-4.46-10.604-5.673-16.077-1.298-5.774-1.927-11.84-1.902-18.184-.045-6.745.542-13.822 1.75-21.153a149.935 149.935 0 015.469-23.035c2.555-7.589 5.856-14.78 9.93-21.287 4.32-5.927 9.526-10.824 15.662-14.41 6.496-2.665 13.639-3.81 21.27-3.59 7.917.947 16.223 2.976 24.747 5.864 8.65 3.161 17.418 6.867 26.13 10.896a775.805 775.805 0 0125.633 12.184c8.257 3.884 16.261 7.834 23.921 11.865 7.53 3.78 14.724 7.747 21.46 11.967 6.598 4.09 12.743 8.584 18.324 13.533 5.401 4.956 10.202 10.49 14.297 16.609",
    "M507.958 389.718c5.875 11.577 8.212 23.198 7.27 33.838-1.893 10.276-7.107 18.496-15.166 23.527-8.858 4.012-20.153 4.97-32.862 3.54-12.357.169-24.922 1.02-36.535 3.784-10.134 7.551-18.39 15.921-25.126 23.222-6.611 7.868-12.821 11.706-18.713 11.047-6.802-2.105-13.644-8.208-20.123-17.084-7.647-9.162-15.028-19.863-21.533-31.244-7.602-11.04-13.331-21.815-17.063-32.33-4.168-10.905-6.022-22.487-5.618-34.688.297-13.152 2.942-27.003 7.956-40.375 5.35-12.766 13.474-23.21 24.51-29.513 12.014-3.193 25.886-1.423 40.557 3.993 15.091 6.7 30.468 15.227 45.11 24.423 14.466 8.695 28.017 17.78 39.81 27.213 11.348 9.142 20.812 19.33 27.526 30.647",
    "M497.37 396.907c4.474 10.371 5.806 19.92 4.31 27.966-2.21 7.773-7.18 13.411-14.398 16.353-7.69 2.507-17.26 2.746-27.845 1.332-10.355.177-21.032.86-31.21 2.834-9.31 5.622-17.267 11.757-23.918 17.154-9.487 7.923-26.542 6.604-34.645-2.42-6.121-7.2-11.921-16.262-16.927-26.58-5.841-10.11-10.14-20.523-12.794-30.973-2.997-10.687-4.065-21.993-3.181-33.604.84-12.063 3.782-24.313 8.813-35.677 5.309-10.577 12.949-18.929 22.925-23.64 10.568-2.198 22.51-.169 34.963 5.037 12.758 6.501 25.723 14.885 38.06 24.094 12.258 9.135 23.685 18.712 33.51 28.38 9.476 9.532 17.181 19.534 22.337 29.744",
    "M485.88 399.655c3.261 9.004 3.897 16.682 2.214 22.678-2.167 5.821-6.537 9.68-12.632 11.386-6.375 1.67-14.181 1.699-22.789.59-8.483.29-17.388.852-26.133 2.147-8.302 3.968-15.657 8.158-21.978 11.785-9.041 5.79-24.404 5.381-31.13-1.431-4.89-5.55-9.354-13.032-13.015-22.063-4.294-8.939-7.245-18.53-8.818-28.365-1.84-9.924-2.05-20.354-.646-30.823 1.41-10.552 4.582-20.932 9.515-30.19 5.094-8.453 12.068-14.87 20.83-18.194 9.085-1.38 19.1.715 29.384 5.482 10.452 5.925 21.012 13.646 30.984 22.243 9.926 8.806 19.128 18.084 26.934 27.315 7.533 9.234 13.506 18.529 17.28 27.44",
    "M474.37 398.756c2.32 10.565-2.913 23.9-9.592 26.43-5.052 1.32-11.214 1.465-18.021.804-6.78.422-14.025.905-21.328 1.655-7.126 2.581-13.625 5.116-19.35 7.2-8.257 3.637-21.954 2.845-27.522-2.445-3.881-4.288-7.238-10.321-9.763-17.935-2.952-7.565-4.72-15.92-5.33-24.57-.801-8.643-.26-17.648 1.594-26.48 1.834-8.71 5.1-17.028 9.736-24.164 4.711-6.43 10.836-11.1 18.262-13.256 7.563-.754 15.695 1.243 23.9 5.382 8.26 5.068 16.511 11.712 24.226 19.199 7.653 7.803 14.676 16.085 20.538 24.291 5.666 8.264 10.046 16.403 12.65 23.89",
    "M463.443 395.439c2.575 12.002-.83 18.93-8.165 20.784-7.808 2.773-18.771 3.207-30.493 2.696-11.633 4.058-21.782 6.297-29.26 4.883-8.023-1.043-14.277-7.842-17.176-20.038-3.988-12.174-3.628-27.004.572-40.86 4.075-13.101 12.542-23.569 24.549-26.904 12.07.364 25.26 8.468 36.601 20.188 11.084 12.886 19.857 27.257 23.372 39.251",
    "M453.392 391.118c.098 11.62-16.143 19.273-28.882 19.134-8.882 1.96-16.862 2.144-22.799-.022-6.272-1.691-10.87-7.133-12.49-16.217-2.208-9.124-.936-19.923 3.111-29.59 3.896-9.033 10.808-15.78 19.881-17.37 8.964.548 18.303 6.491 26.027 15.046 7.502 9.384 13.176 20.047 15.152 29.02",
    "M444.091 387.158c.994 11.828-7.96 16.517-19.499 14.403-12.066 2.205-22.242-2.906-23.378-14.892-2.187-12.124 5.605-25.942 17.805-27.757 11.746 2.068 23.106 16.29 25.072 28.246",
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      className={cx(className, "opacity-60")}
    >
      <g
        strokeWidth={2}
        stroke="hsl(150, 69%, 53%)"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="0 0"
      >
        {paths.map((path, index) => {
          const maxOpacity = 1 - (index + 1) / paths.length;
          const fadeTime = (paths.length - (index + 1)) * 0.1;
          return (
            <path
              key={index}
              d={path}
              opacity={maxOpacity}
              style={{
                animationDelay: fadeTime.toString() + "s",
              }}
              className="animate-flash"
            />
          );
        })}
      </g>
      <defs>
        <filter
          id="a"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation={40}
            x="0%"
            y="0%"
            in="SourceGraphic"
            result="blur"
          />
        </filter>
      </defs>
      <g filter="url(#a)">
        <ellipse
          rx={262.5}
          ry={171.5}
          cx={430.20351777989396}
          cy={390.92908246444847}
          fill="hsla(286, 0%, 0%, 0.6)"
        />
      </g>
    </svg>
  );
};

export const Hero = () => {
  return (
    <div className="relative flex h-[80vh] items-center justify-center">
      <WavesAnimation className="absolute top-1/2 -translate-y-1/2" />
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold">
          <Trans>Share your music discoveries</Trans>
        </h1>
        <p className="mx-auto max-w-[38rem] py-6 text-lg text-base-content-neutral">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae.
        </p>
        <Link href="/songs">
          <a>
            <Button size="lg">
              <Trans>Explore songs</Trans>
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};
