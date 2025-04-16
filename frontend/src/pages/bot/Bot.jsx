// import { useMemo } from 'react';
// import { Container, Header, MessageList, Composer, ComposerInput, ComposerButton, WebchatProvider, getClient } from "@botpress/webchat";
// import { buildTheme } from "@botpress/webchat-generator";

// const { theme, style } = buildTheme({
//   themeName: "prism",
//   themeColor: "#634433",
// });

// const clientId = import.meta.env.CLIENT_ID;

// const config = {
//   composerPlaceholder: "What would you like to know?",
//   botName: "Clarify",
//   botDescription:
//     "\"Clarify - Where question meets clarity\" , is an advanced AI agent designed to resolve your placement-related queries with precision and ease.",
//   email: {},
//   phone: {},
//   website: {},
//   termsOfService: {},
//   privacyPolicy: {},
//   color: "#3B82F6",
//   variant: "solid",
//   themeMode: "light",
//   fontFamily: "inter",
//   radius: 1
// };

// export default function Bot() {
//   const client = useMemo(() => getClient({ clientId }), []);

//   return (
//       <div className='w-[1024px] h-[95dvh] px-15 pb-5 pt-15'>
//         <style>{style}</style>
//         <WebchatProvider
//           key={JSON.stringify(config)}
//           theme={theme}
//           configuration={config}
//           client={client}
//         >
//           <Container>
//             <Header />
//             <MessageList />
//             <Composer>
//               <ComposerInput />
//               <ComposerButton />
//             </Composer>
//           </Container>
//         </WebchatProvider>
//       </div>
//   );
// }

import React from 'react';

const Bot = () => {

  return(
    <>
      <iframe className="h-[90vh] w-[90dvw] max-w-[1150px] -z-10 px-4 py-4" src="https://shorturl.at/EkfnY"/>
    </>
  )
};

export default Bot;
