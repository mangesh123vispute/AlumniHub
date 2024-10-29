import React from 'react';

const FooterSection = () => {
  return (
    <footer className="bg-navy-blue text-white py-2">
        {/* Footer Bottom */}
        <div className="mt-2 text-center">
          <p className="text-sm">© {new Date().getFullYear()} SSBT COET. All rights reserved.</p>
        </div>  
    </footer>
  );
};

export default FooterSection;
