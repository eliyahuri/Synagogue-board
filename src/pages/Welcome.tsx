interface WelcomeProps {
  synagogueName: string;
  lang: "he" | "en";
}

function Welcome({ synagogueName, lang }: WelcomeProps) {
  return lang === "he" ? (
    <div className="bg-gradient-to-r from-yellow-400 to-black bg-clip-text text-transparent text-9xl">
      ברוכים הבאים לבית הכנסת {synagogueName}
    </div>
  ) : (
    <div className="bg-gradient-to-r from-yellow-400 to-black bg-clip-text text-transparent text-9xl">
      Welcome to {synagogueName} Synagogue
    </div>
  );
}

export default Welcome;
