defmodule TwitchBot do
  use WebSockex

  @oauth_token "jk8oswwaa498oubrd95atn9wtv1fjb"
  @nick "tony_linguica_bot"
  @channel "1bladez"
  @url "wss://irc-ws.chat.twitch.tv:443"

  def start_link(_) do

    IO.puts("Starting link")

    case WebSockex.start_link(@url, __MODULE__, %{}, name: __MODULE__) do
      {:ok, pid} -> {:ok, pid}
      {:error, reason} ->
        IO.puts("Failed to start WebSockex: #{inspect(reason)}")
        {:error, reason}
    end
    IO.puts("WebSockex linked")
  end


  def handle_connect(_conn, state) do
    send(self(), :authenticate)
    {:ok, state}
  end

  def handle_info(:authenticate, state) do
    send_message("PASS oauth:#{@oauth_token}")
    send_message("NICK #{@nick}")
    send_message("JOIN ##{@channel}")
    {:noreply, state}
  end

  def handle_frame({:text, message}, state) do
    IO.puts("Server: #{message}")

    if String.contains?(message, "PING") do
      send_message("PONG")
      send_message("<- n é o Tony. This is an automated message: PONG")
      send_message("/timeout joaozerar6 2")
    end

    if String.contains?(message, "vapo") do
      send_message("<- n é o Tony. ⠄⠄⠄⠄⠄⣀⣤⣲⣽⠶⠅⢭⠴⠶⠿⠛⠋⠉⠄⠈⠄⠑⠂⠂⠄⠄⠄⠄⠄⠄")
    end

    if String.contains?(message, "sexo") do
      send_message("<- n é o Tony.       para com isso ae #{get_user_name(message)}")
    end

    {:ok, state}
  end

  defp send_message(message) do
    WebSockex.send_frame(self(), {:text, message})
  end


  defp get_user_name(message) do
    case Regex.run(~r/^:(\w+)!.*\s(\w+)\s#\w+/, message) do
      [_, username | _] -> "@#{username}"
      _ -> ""
    end
  end
end
