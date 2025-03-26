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

const clientId = import.meta.env.CLIENT_ID; // Replace with your actual client ID

const config = {
  composerPlaceholder: "What would you like to know?",
  botName: "Clarify",
  botDescription:
    "\"Clarify - Where question meets clarity\" , is an advanced AI agent designed to resolve your placement-related queries with precision and ease.",
  email: {},
  phone: {},
  website: {},
  termsOfService: {},
  privacyPolicy: {},
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