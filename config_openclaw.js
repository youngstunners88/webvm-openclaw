// WebVM + OpenClaw Configuration
// This config uses the custom Debian image with OpenClaw pre-installed

// For local development - replace with your built ext2 image URL
export const diskImageUrl = "/disk-images/debian_openclaw.ext2";

// Disk image type: "bytes" for local files, "cloud" for remote URLs
export const diskImageType = "bytes";

// Print an introduction message about the technology
export const printIntro = true;

// Is a graphical display needed
export const needsDisplay = false;

// Start with bash
export const cmd = "/bin/bash";

// Arguments
export const args = ["--login"];

// Environment variables
export const opts = {
	env: [
		"HOME=/home/user",
		"TERM=xterm",
		"USER=user",
		"SHELL=/bin/bash",
		"EDITOR=vim",
		"LANG=en_US.UTF-8",
		"LC_ALL=C",
		"PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games"
	],
	cwd: "/home/user",
	uid: 1000,
	gid: 1000
};
