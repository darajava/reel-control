# ReelControl

Take back control of videos on the web by reversing the pretty annoying trend of tech companies removing native video controls to keep you hooked. ReelControl will add a progress bar and playback controls anywhere on the web that they should rightfully be! That is, on Instagram, YouTube Shorts, or Facebook Reels.

Companies remove progress bars to keep you hooked. Adding it back in lets you

- Know the time commitment before watching
- Rewind when you miss something
- Skip ahead and go back without having to start over

I built this for myself and found that not only is it a little bit more enjoyable if I ever do end up on those videos, but I notice myself spending a lot less time on them without explicitly blocking them. I spend less time on my phone too, since I am now used to having that progress bar and just get frustrated and leave immediately.

== Platform Notes ==

Instagram

- Instagram has a pretty clean video interface, so we only add the native video controls.

YouTube Shorts

- YouTube does have its own progress bar, but it's propriatary and kept out of view and so it doesn't allow the user to tell the length of the video at a glance.

- YouTube Shorts interface is crazy cluttered, so we have some options to remove most elements from view.

Facebook Reels

- Facebook Reels have a crazy amount of clutter, and also no progress bar or video controls.

- Facebook's HTML structure is extremely obfuscated, so we just removed all the clutter and added a progress bar. If anyone wants to add more fine-grained control, PRs are most welcome here!

--

Open source, PRs and issues are welcome @ https://github.com/darajava/reel-control/

--

Built by Soliloquy Apps

Like this extension? We also built AudioDiary--a super smart voice-powered journal that's gotten lots of love from its users.

Try it out at https://audiodiary.ai !
