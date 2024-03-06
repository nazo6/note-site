import { GithubIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="mx-auto w-full">
      <div className="flex w-full bg-content py-6 justify-center">
        ©nazo6
        <div className="flex ml-5">
          <a
            href="https://github.com/nazo6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="nazo6 github"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
