defmodule TwitchBot.Application do
  use Application

  def start(_type, _args) do
    children = [
      {TwitchBot, []}
    ]

    IO.puts("Starting app")


    opts = [strategy: :one_for_one, name: TwitchBot.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
