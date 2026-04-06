@EventHandler
public void onChat(AsyncPlayerChatEvent e) {
    String player = e.getPlayer().getName();
    String message = e.getMessage();

    try {
        URL url = new URL("http://localhost:3000/chat");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();

        con.setRequestMethod("POST");
        con.setDoOutput(true);
        con.setRequestProperty("Content-Type", "application/json");

        String json = "{\"player\":\"" + player + "\",\"message\":\"" + message + "\"}";

        OutputStream os = con.getOutputStream();
        os.write(json.getBytes());
        os.flush();
        os.close();

        con.getResponseCode();
    } catch (Exception ex) {
        ex.printStackTrace();
    }
}
