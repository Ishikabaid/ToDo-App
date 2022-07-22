import React from 'react'

const Checkmark = ({ onClick }: any) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="32" height="32"
            viewBox="0 0 172 172"
            onClick={ onClick }
            style={{ fill: "#000000", cursor: 'pointer', margin:"10px" }}
        >
            <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="none" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}><path d="M0,172v-172h172v172z" fill="#ffffff" stroke="none" strokeWidth="1"></path><g><path d="M86,165.55c-43.8643,0 -79.55,-35.6857 -79.55,-79.55c0,-43.8643 35.6857,-79.55 79.55,-79.55c43.8643,0 79.55,35.6857 79.55,79.55c0,43.8643 -35.6857,79.55 -79.55,79.55z" fill="#ffffff" stroke="none" stroke-width="1"></path><path d="M86,8.6c42.6775,0 77.4,34.7225 77.4,77.4c0,42.6775 -34.7225,77.4 -77.4,77.4c-42.6775,0 -77.4,-34.7225 -77.4,-77.4c0,-42.6775 34.7225,-77.4 77.4,-77.4M86,4.3c-45.1199,0 -81.7,36.5801 -81.7,81.7c0,45.1199 36.5801,81.7 81.7,81.7c45.1199,0 81.7,-36.5801 81.7,-81.7c0,-45.1199 -36.5801,-81.7 -81.7,-81.7z" fill="#2ecc71" stroke="none" stroke-width="1"></path><path d="M47.3,86l25.8,25.8l55.9,-55.9" fill="none" stroke="#2ecc71" stroke-width="8.6">
            </path>
            </g>
            </g>
        </svg>

    )
}

export default Checkmark