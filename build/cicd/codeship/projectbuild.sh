#!/bin/bash
go mod init WealthManagementongolang 
go mod tidy 
go build 
go test WealthManagementongolang/internal/test 
cp -r -n /gitRoot/ /code/