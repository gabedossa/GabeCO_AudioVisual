import React from 'react';

interface FooterProps {
    companyName?: string;
    year?: number;
}

const Footer: React.FC<FooterProps> = ({ 
    companyName = 'Gabe Audiovisual', 
    year = new Date().getFullYear() 
}) => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">About</h3>
                        <p className="text-gray-400">Learn more about our company and services.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="text-gray-400 space-y-2">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">Services</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact</h3>
                        <p className="text-gray-400">email@example.com</p>
                        <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>&copy; {year} {companyName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;