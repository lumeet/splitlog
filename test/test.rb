fd = IO.sysopen('tmp.log', 'a+')
begin
  f = IO.new(fd)
  loop do
    str = "#{Time.now.strftime('%FT%T.%L')} #{rand(2)} LOG\n"
    puts str
    f.write_nonblock str
    sleep 0.2
  end
ensure
  f.close
end
