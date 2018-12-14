let s:base = expand('<sfile>:h:h')

function! s:trex()
  let cmd = has('win32') ? 'electron.cmd' : 'electron'
  let s:job = job_start([cmd, s:base], {
  \ 'callback': {x->[execute('echomsg x', 1)]},
  \})
  call foreground()
endfunction

command! TRex call s:trex()
