import { signInAction } from "@/app/_lib/actions";

const providers = {
    google: {
        label: "Continue with Google",
        image: {
            src: "https://authjs.dev/img/providers/google.svg",
            alt: "Google logo",
        },
    },
    github: {
        label: "Continue with GitHub",
        image: {
            src: "https://authjs.dev/img/providers/github.svg",
            alt: "Github logo",
        },
    },
};

const SignInButton = ({ provider = "google" }) => {
    const { label, image } = providers[provider];

    const signInWithProvider = signInAction.bind(null, provider);

    return (
        <form action={signInWithProvider}>
            <button className="secondary-button">
                <img
                    src={image.src}
                    alt={image.alt}
                    height="24"
                    width="24"
                />
                <span>{label}</span>
            </button>
        </form>
    );
};

export default SignInButton;