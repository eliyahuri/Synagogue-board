interface WelcomeProps {
  synagogueName: string;
}

function Welcome({ synagogueName }: WelcomeProps) {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-black bg-clip-text text-transparent text-9xl">
      ברוכים הבאים לבית הכנסת {synagogueName}
    </div>
  );
}

export default Welcome;
