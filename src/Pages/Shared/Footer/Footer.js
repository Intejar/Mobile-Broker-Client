import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
    
    return (
        <div className='bg-footer dark:bg-slate-600 dark:text-white'>
            <footer className="footer p-10  text-neutral-content">
                <div>
                    <span className="text-black dark:text-white font-semibold footer-title">Services</span>
                    <Link className="text-black dark:text-white font-semibold link link-hover">Branding</Link>
                    <Link className="text-black dark:text-white font-semibold link link-hover">Design</Link>
                    <Link className="text-black dark:text-white font-semibold link link-hover">Marketing</Link>
                    <Link className="text-black dark:text-white font-semibold link link-hover">Advertisement</Link>
                </div>
                <div>
                    <span className="text-black dark:text-white font-semibold footer-title">Company</span>
                    <Link className="text-black dark:text-white font-semibold link link-hover">About us</Link>
                    <Link className="text-black dark:text-white font-semibold link link-hover">Contact</Link>
                    <Link className="text-black dark:text-white font-semibold link link-hover">Jobs</Link>
                    <Link className="text-black dark:text-white font-semibold link link-hover">Press kit</Link>
                </div>
                <div>
                    <span className="text-black dark:text-white font-semibold footer-title">Legal</span>
                    <Link className="text-black dark:text-white font-semibold link link-hover">Terms of use</Link>
                    <Link className="text-black dark:text-white font-semibold link link-hover">Privacy policy</Link>
                    <Link className="text-black dark:text-white font-semibold link link-hover">Cookie policy</Link>
                </div>
            </footer>
            <h1 className='text-sm text-center font-bold'>Copyright © 2022 - All right reserved by Mobile Ltd</h1>
        </div>
    );
};

export default Footer;