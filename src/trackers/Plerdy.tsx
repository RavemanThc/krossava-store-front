"use client";

import Script from "next/script";

const PlerdyTag = () => {
  return (
    <Script
      id="plerdy-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d){
            if(w.__plerdyCode)return;
            w.__plerdyCode=1;
            w._protocol=w.location.protocol=="https:"?"https://":"http://";
            w._site_hash_code="62293851a1913246fdc924876a6c5ced";
            w._suid=77981;
            var s=d.createElement("script");
            s.async=true;
            s.referrerPolicy="strict-origin-when-cross-origin";
            s.src="https://a.plerdy.com/public/js/click/main.js?v="+Math.random();
            d.head.appendChild(s);
          })(window,document);
        `,
      }}
    />
  );
};

export default PlerdyTag;
