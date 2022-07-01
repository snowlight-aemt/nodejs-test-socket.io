# WebSocket And Kafka 예정 코드

> 주의사항 .env 설정 파일은 반드시 설정해야 한다.

## .env 설정 값 입력
```
# 웹 서버에 설정.
HOST=localhost
PORT=3000

# Kafka 설정
TOPIC='dev.api.kiosk.node.three.json'
GROUP_ID='test-group-2'
BOOTSTRAP_SERVER='localhost:19092,localhost:29092,localhost:39092'
```