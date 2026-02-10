import { DiscordIcon, SpotifyIcon, GitHubIcon } from './Icons';
import '../styles/SocialLinks.css';

const LINKS = [
  {
    name: 'Discord',
    url: 'https://discord.com/users/712684467210289204',
    icon: <DiscordIcon />
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/user/c.j.a.34a',
    icon: <SpotifyIcon />
  },
  {
    name: 'GitHub',
    url: 'https://github.com/1ceit',
    icon: <GitHubIcon />
  }
];

export default function SocialLinks() {
  return (
    <div className="social-links-container">
      {LINKS.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link-button"
          style={{ borderRadius: '12px' }}
        >
          <span className="social-icon">{link.icon}</span>
          <span className="social-name">{link.name}</span>
        </a>
      ))}
    </div>
  );
}
