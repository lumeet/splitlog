Thread.new do
  fd = IO.sysopen('tmp.log', 'a+')
  begin
    f = IO.new(fd)
    loop do
      str = "#{rand(2)} LOG\n"
      puts str
      f.write_nonblock str
      sleep 0.05
    end
  ensure
    f.close
  end
end

loop do
end
