defmodule TwitchBot do
  use GenServer
  require Logger

  @oauth_token "jk8oswwaa498oubrd95atn9wtv1fjb"
  @nick "tony_linguica_bot"
  @channel "1bladez"
  @url 'wss://irc-ws.chat.twitch.tv:443'

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def init(_) do
    {:ok, _conn} = :websocket_client.start_link(@url, __MODULE__, %{})
    {:ok, %{}}
  end

  def handle_info({:websocket, :connected}, state) do
    :websocket_client.send_frame({:text, "PASS oauth:#{@oauth_token}"}, __MODULE__)
    :websocket_client.send_frame({:text, "NICK #{@nick}"}, __MODULE__)
    :websocket_client.send_frame({:text, "JOIN ##{@channel}"}, __MODULE__)
    {:noreply, state}
  end

  def handle_info({:websocket, {:frame, {:text, message}}}, state) do
    IO.puts("Server: #{message}")

    if String.contains?(message, "PING") do
      :websocket_client.send_frame({:text, "PONG"}, __MODULE__)
      send_message("<- n é o Tony. This is an automated message: PONG")
      send_message("/timeout joaozerar6 2")
    end

    if String.contains?(message, "vapo") do
      send_message("<- n é o Tony. ⠄⠄⠄⠄⠄⣀⣤⣲⣽⠶⠅⢭⠴⠶⠿⠛⠋⠉⠄⠈⠄⠑⠂⠂⠄⠄⠄⠄⠄⠄")
    end

    if String.contains?(message, "sexo") do
      send_message("<- n é o Tony.       para com isso ae #{get_user_name(message)}")
    end

    {:noreply, state}
  end

  defp send_message(message) do
    :websocket_client.send_frame({:text, "PRIVMSG ##{@channel} :#{message}"}, __MODULE__)
  end

  defp get_user_name(message) do
    case Regex.run(~r/^:(\w+)!.*\s(\w+)\s#\w+/, message) do
      [_, username | _] -> "@#{username}"
      _ -> ""
    end
  end
end
