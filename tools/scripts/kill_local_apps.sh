#!/usr/bin/env sh
# NOTE: If you add new app, add new kill command

echo "\033[32m✔\033[m Kill local apps"
client_next_pid="$(lsof -t -i :4200)"
if [[ "" !=  "$client_app_pid" ]]; then
    echo "killing client app"
    kill -9 $client_app_pid
fi
client_expo_pid="$(lsof -t -i :8081)"
if [[ "" !=  "$client_expo_pid" ]]; then
    echo "killing client expo app"
    kill -9 $client_expo_pid
fi
server_nest_pid="$(lsof -t -i :3000)"
if [[ "" !=  "$server_nest_pid" ]]; then
    echo "killing server"
    kill -9 $server_nest_pid
fi
exit 0
