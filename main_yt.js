/* Creates the HTML tags. */
	const stuff = "<div class=\"panel\"><label for=\"framerate\" class=\"just_a_little_padding\">Framerate: </label><input type=\"text\" id=\"framerate\" class=\"retime\" value=\"30\" onchange='check_fps(event)'><label for=\"startobj\" class=\"just_a_little_padding\">Starting frame: </label><input type=\"text\" id=\"startobj\" class=\"retime frame_input\" onchange='parse_time(event)'><label for=\"endobj\" class=\"just_a_little_padding\">Ending frame: </label><input type=\"text\" id=\"endobj\" class=\"retime frame_input\" onchange='parse_time(event)'><input type=\"text\" class=\"retime\" id=\"mod_message\" readonly disabled></input><button id=\"mod_message_button\" class=\"buttons\" disabled onclick=\"copy_mod_message()\">Copy</button><button class=\"buttons\" onclick=\"change_fps()\">Change Framerate</button></div>"
	document.getElementById("offer-module").innerHTML = stuff + document.getElementById("offer-module").innerHTML

/* Changes the fps on the input box to the video fps if the "Stats for nerds" window is opened. */
function change_fps() {
let fps_value = document.querySelector("#movie_player > div.html5-video-info-panel > div > div:nth-child(3) > span").innerText
fps_value = fps_value.split("@");
fps_value = fps_value[1].split(" ");
document.getElementById("framerate").value = fps_value[0];
}

/* From now on all the code is from https://github.com/Mango0x45/no-ad-retimer */
/* Compute the total duration of the run. */
function compute()
{
	const fps = parseInt(document.getElementById("framerate").value);
	const s_time = document.getElementById("startobj").value;
	const e_time = document.getElementById("endobj").value;

	/* Return early if not all fields are filled */
	if (s_time === undefined || e_time === undefined || fps === undefined)
		return;

	/* Return early on a negative time */
	const frames = (e_time - s_time) * fps;
	if (frames < 0)
		return;

	const seconds = Math.round(frames / fps * 1000) / 1000;

	/* Show the time and mod message in the DOM. */
	const s_frame = Math.trunc(s_time * fps);
	const e_frame = Math.trunc(e_time * fps);
	const time = time_format(seconds);
	const mod_message = `Mod Note: Retimed (Start Frame: ${s_frame}, End Frame: ${
		e_frame}, FPS: ${fps}, Total Time: ${time})`;

	document.getElementById("mod_message").disabled = false;
	document.getElementById("mod_message").value = mod_message;
	document.getElementById("mod_message_button").disabled = false;
}

/* Convert seconds to human readable time. */
function time_format(t)
{
	const h = ~~(t / 3600);
	const m = ~~((t % 3600) / 60);
	const s = t % 60;
	let ret = "";

	if (h > 0)
		ret += h + ":" + (m < 10 ? "0" : "");

	ret += m + ":" + (s < 10 ? "0" : "") + s.toFixed(3);

	return ret;
}

/* Allow user to copy mod message to clipboard. */
function copy_mod_message()
{
	const mod_message = document.getElementById("mod_message");
	mod_message.focus();
	mod_message.select();
	document.execCommand("copy");
}

/* If framerate is invalid, show an error message and disable start and end frame fields. */
function check_fps(event)
{
	fps = event.target.value;
	if (fps > 0 && fps % 1 == 0) {
		document.getElementById("startobj").disabled = false;
		document.getElementById("endobj").disabled = false;
	}
	else {
		document.getElementById("framerate")
			.setCustomValidity("Please enter a valid framerate.");
		document.getElementById("framerate").reportValidity();
		document.getElementById("startobj").disabled = true;
		document.getElementById("endobj").disabled = true;
	}
}

/* Get current frame from input field (either start time or end time). */
function parse_time(event)
{
	/* Return early if invalid JSON is passed (numbers are valid) */
	let input, dinfo;
	try {
		dinfo = JSON.parse(event.target.value);
	} catch {
		document.getElementById(event.target.id).value = "";
		return;
	}

	/* If cmt isn't available fallback to lct, also allow raw numbers */
	if (!(input = dinfo.cmt) && !(input = dinfo.lct) && typeof ((input = dinfo)) !== "number") {
		document.getElementById(event.target.id).value = "";
		return;
	}

	/* Calculate the exact timestamp */
	const fps = parseInt(document.getElementById("framerate").value);
	const frame = Math.floor(input * fps) / fps;
	document.getElementById(event.target.id).value = `${frame}`;

	/* If all fields are filled the compute */
	if (document.getElementById("startobj").value && document.getElementById("endobj").value)
		compute();
}
