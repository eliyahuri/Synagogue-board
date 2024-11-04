interface WelcomeProps {
  synagogueName: string;
}

function Welcome({ synagogueName }: WelcomeProps) {
  return <div>ברוכים הבאים לבית הכנסת {synagogueName}</div>;
}

export default Welcome;
