import React, { useMemo } from 'react'; // Added React import
import { Container, Header, MessageList, Composer, ComposerInput, ComposerButton, WebchatProvider, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import Footer from './footer/Footer';

const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#634433",
});

const scopedStyles = `
  .webchat-container ${style}
`;

const clientId = "b3d342e4-1c98-42ed-9db3-989c08a56915"; // Replace with your actual client ID

const config = {
  composerPlaceholder: "What would you like to know?",
  botName: "Clarify",
  botAvatar: "https://drive.google.com/file/d/1H1cjsyrtU4KzRoyfKmAANHuGbqRii1UN/view?usp=sharing",
  botDescription:
    "\"Clarify - Where question meets clarity\" , is an advanced AI agent designed to resolve your placement-related queries with precision and ease.",
  email: {},
  phone: {},
  website: {},
  termsOfService: {},
  privacyPolicy: {
    title: "Privacy policy",
    link: "https://botpress.com/privacy",
  },
  color: "#3B82F6",
  variant: "solid",
  themeMode: "light",
  fontFamily: "inter",
  radius: 1
};

export default function Bot() {
  const client = useMemo(() => getClient({ clientId }), []);

  return (
    <>
      <div className='webchat-container isolate w-full h-[100dvh] px-15 pb-3 pt-25'>
        <style>{scopedStyles}</style>
        <WebchatProvider
          key={JSON.stringify(config)}
          theme={theme}
          configuration={config}
          client={client}
        >
          <Container>
            <Header />
            <MessageList />
            <Composer>
              <ComposerInput />
              <ComposerButton />
            </Composer>
          </Container>
        </WebchatProvider>
      </div>
      <Footer />
    </>
  );
}