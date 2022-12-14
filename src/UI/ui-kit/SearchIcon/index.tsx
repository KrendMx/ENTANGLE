/* eslint-disable max-len */
import React from 'react';

const SearchIcon: React.FC<{
    color: string;
    size: number;
    customClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
}> = ({ color, size, ...props }) => (
    <div className={props?.customClassName} style={{ width: '16px', height: '16px' }}>
        <svg
            width={`${size}`}
            height={`${size}`}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 7.5C0 11.6421 3.35786 15 7.5 15C9.2316 15 10.8262 14.4131 12.0957 13.4275C12.1435 13.5286 12.2092 13.6234 12.2929 13.7071L18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L13.7071 12.2929C13.6234 12.2092 13.5286 12.1435 13.4275 12.0957C14.4131 10.8262 15 9.2316 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5ZM2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5C13 10.5376 10.5376 13 7.5 13C4.46243 13 2 10.5376 2 7.5Z"
                fill={`${color}`}
                fillOpacity="1"
            />
        </svg>
    </div>
);

export default SearchIcon;
