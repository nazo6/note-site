import { SiGithub } from "@icons-pack/react-simple-icons";
import { ZennIcon } from "../ui/ZennIcon";

export function Footer() {
  return (
    <footer className="mx-auto w-full drop-shadow-[0_-5px_5px_rgba(0,0,0,0.1)]">
      <div className="flex w-full bg-content py-4 justify-center">
        <span className="mr-2">©</span>
        <a target="_blank" rel="noopener noreferrer" href="https://nazo6.dev">
          nazo6.dev
        </a>
        <div className="flex ml-5 gap-2">
          <a
            href="https://github.com/nazo6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="nazo6 github"
          >
            <SiGithub />
          </a>
          <a
            href="https://zenn.dev/nazo6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="nazo6 zenn"
          >
            <ZennIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
