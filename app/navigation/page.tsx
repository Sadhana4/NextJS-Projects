// import React from 'react';
// import Link from 'next/link';

// const Navigation = () => {
//     return (
//         <div>
//             <div className="row bg-slate-500 p-3">
//                 <div className="col text-center text-white">
//                 <Link className='p-4' href="/dashboard/blogs">Blogs</Link>
//                 <Link className='p-4' href="/dashboard/post-blogs">Create Blog</Link>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Navigation

import Link from "next/link";
import React, { useState } from "react";
const Navbar = () => {


    const links = [
        {
            id: 1,
            link: "/dashboard/blogs",
            name: "Home"
        },
        {
            id: 2,
            link: "/dashboard/post-blogs",
            name: "Create Blog"
        },

    ];

    return (
        <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black nav">
            <div>
                {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
                <h1 className="text-3xl font-signature ml-2 text-white">
                    <a
                        className="link-underline-black no-underline text-white"
                        href=""
                        target="_blank"
                        rel="noreferrer"
                    >
                        Blog App
                    </a>
                </h1>
            </div>

            <ul className="flex">
                {links.map((x) => (
                    <li
                        key={x.id}
                        className="nav-links no-underline px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
                    >
                        <Link className="no-underline font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline" href={x.link}>{x.name}</Link>
                    </li>
                ))}
            </ul>



        </div>
    );
};

export default Navbar;


