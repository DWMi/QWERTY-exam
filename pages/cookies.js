import Head from "next/head";


const cookie = () => {
  return (
    <>
     <Head>
        <title>QWERTY - Cookies</title>
        <meta name="description" content="QWERTY - Your one-stop shop for custom built mechanical keyboards, accessories, and more. We specialize in Keychron, Ducky, Yunzii, Varmilo and other mechanical keyboard brands."/>
        <meta name="keywords" content="mechanical keyboard, custom keyboard, Keychron, Ducky, Yunzii, Varmilo, keyboard accessories"/>
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="QWERTY"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div style={{ margin: "40px", padding: "20px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bolder" }}>
        Cookies Policy - QWERTY Keyboards
      </h1>
      <br />
      <p>
        At <strong> QWERTY Keyboards</strong>, we use cookies to enhance your browsing experience
        on our website. Cookies are small text files that are stored on your
        device when you visit our website. <br />
        They help us understand how you interact with our website and how we can
        improve it.
      </p>
      <br />
      <p>
        We use first-party cookies, which are cookies that are set by our
        website and can only be accessed by our website. We do not share your
        information with any third-party websites or advertisers.
      </p>
      <br />
      <br />
      <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>
        The types of cookies we use include:
      </h2>
      <br />
      <ul>
        <li>
          <strong> Session cookies:</strong> These cookies are temporary and are deleted when you
          close your browser. They are used to remember your preferences and
          keep you logged in to your account.
        </li>
        <br />
        <li>
         <strong> Persistent cookies:</strong> These cookies are stored on your device for a
          longer period of time. They are used to remember your preferences and
          settings for future visits to our website.
        </li>
      </ul>
      <br />
      <br />
      <p>
        You can control the use of cookies on our website by adjusting your
        browser settings. You can also delete cookies that have already been
        stored on your device. However, please note that disabling cookies may
        affect your ability to use some features of our website.
      </p>
      <br />
      <br />
      <p>
        If you have any questions or concerns about our use of cookies, please
        contact us at {' '}
        <a
          style={{ fontWeight: "bold" }}
          href="mailto:info.qwertykeyboards@gmail.com"
        >
          info.qwertykeyboards@gmail.com
        </a>
        . We are committed to protecting your privacy and will be happy to
        assist you.
      </p>
    </div>
    </>
  );
};

export default cookie;
