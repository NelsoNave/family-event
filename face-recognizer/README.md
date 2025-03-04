## execute on local
## setup
### pip3
```
pip3 install functions-framework
pip3 install -r requirements.txt
```
### pip
```
pip install functions-framework
pip install -r requirements.txt
```

### run server
```
python3 -m functions_framework --target recognize_faces_http --port=8888
```

### test
```
python3 test_local.py
```

## execute on server
```
python3 face_recognizer.py
```