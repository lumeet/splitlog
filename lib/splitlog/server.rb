# encoding: utf-8
require 'rack/handler/puma'
require 'faye/websocket'
require 'singleton'
require 'json'

module Splitlog #:nodoc:
  class Server
    include Singleton

    def start(filename, regexp)
      @filename = filename
      @regexp = regexp

      app = proc do |env|
        if Faye::WebSocket.websocket?(env)
          ws = Faye::WebSocket.new(env)

          ws.on :open do
            @monitor = Thread.new { monitor_log(ws) }
          end

          ws.on :close do
            @monitor.kill
          end
        else
          case env['PATH_INFO']
          when '/'
            ['200', { 'Content-Type' => 'text/html' }, [File.read('./static/index.html')]]
          when %r{^/js/}
            ['200', { 'Content-Type' => 'application/javascript' },
             [File.read(File.join('static', env['PATH_INFO']))]]
          when %r{^\.css}
            ['200', { 'Content-Type' => 'text/css' },
             [File.read(File.join('static', env['PATH_INFO']))]]
          else
            ['404', { 'Content-Type' => 'text/html' }, []]
          end
        end
      end

      Rack::Handler::Puma.run app, Port: 3333
    end

    private

    def monitor_log(ws)
      fd = IO.sysopen(@filename, 'r')
      f = IO.new(fd)
      begin
        f.seek 0, IO::SEEK_END
        loop { f.readlines.each { |line| send_line(ws, line) } }
      ensure
        f.close
      end
    end

    def send_line(ws, line)
      index = line[0..0].to_i
      line =~ @regexp
      group = Regexp.last_match ? Regexp.last_match(1) : nil
      ws.send({ text: "#{' ' * index * 20}#{line}",
                group: group }.to_json)
    end
  end
end
