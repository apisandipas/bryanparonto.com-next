import Script from "next/script";

const tagID = "324853605";

export default function Analytics() {
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics*/}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${tagID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', tagID);
        `}
      </Script>
    </>
  );
}
