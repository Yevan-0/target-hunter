import { supabase } from "./supabase"

export async function submitScore(name: string, score: number) {
  const { error } = await supabase
    .from('Leaderboard')
    .insert({ name, score })
  
  if (error) console.error('Error submitting score:', error)
}

export async function getLeaderboard() {
  const { data, error } = await supabase
    .from('Leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .limit(10)
  
  if (error) console.error('Error fetching leaderboard:', error)
  return data
}