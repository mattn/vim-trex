let s:base = expand('<sfile>:h:h')

function! s:trex()
  let s:job = job_start(['c:/msys64/mingw64/bin/electron.cmd', s:base], {
  \ 'callback': {x->[execute('echomsg x', 1)]},
  \})
  call foreground()
endfunction

command! TRex call s:trex()
