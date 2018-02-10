defmodule Memory.Game do

  def new() do
    %{
      cards: deal(),
      matched: [],
      attempted: [],
      score: 0
    }
  end


  def client_view(game) do
    %{
      cards: display(game),
      status: matched?(game),
      score: game.score
    }
  end


  def deal() do
    ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"]
    |> Enum.shuffle()
  end


  def display(game) do
    range = 0..(Kernel.length(game.cards) - 1)
    Stream.map(range, fn (x) ->
      cond do
        Enum.member?(game.attempted, x) -> Enum.at(game.cards, x)
        Enum.member?(game.matched, x) -> "COMPLETED"
        TRUE -> "CLICK TO GUESS"
      end
    end)
  end


  def matched?(game) do
    range = 0..(Kernel.length(game.cards) - 1)
    Stream.map(range, fn (x) ->
      cond do
        Enum.member?(game.attempted, x) -> "attempts"
        true -> "COMPLETED"
      end
    end)
  end


  def pair(game) do
    if Enum.at(game.cards, Enum.at(game.attempted, 0)) ==
      Enum.at(game.cards, Enum.at(game.attempted, 1)) do
      %{
        cards: game.cards,
        matched: Enum.concat(game.matched, game.attempted),
        attempted: [],
        score: game.score + 2
      }
    else
      %{
        cards: game.cards,
        matched: game.matched,
        attempted: [],
        score: game.score + 2
      }
    end
  end


  def clicked(game, current) do
    cond do
      Enum.member?(game.matched, current) -> game

      Enum.member?(game.attempted, current) -> game

      Kernel.length(game.attempted) == 2 -> game

      Kernel.length(game.attempted) == 1 or Kernel.length(game.attempted) == 0 ->
        %{
          cards: game.cards,
          matched: game.matched,
          attempted: Enum.concat(game.attempted, [current]),
          score: game.score
        }
    end
  end
end
