package utils

import (
	"github.com/joho/godotenv"
	"gorm.io/gorm"
  	"gorm.io/driver/mysql"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
	"fmt"
	"strconv"
	"log"
	"WealthManagement-on-golang/internal/model"
)

//----------------------------------------------------------------------------
// global level var declarations
//----------------------------------------------------------------------------
var db *gorm.DB

type RequestResult struct {
    Success  	bool
	Msg 		string
	Call 		string
	Data 		interface{}
}

//----------------------------------------------------------------------------
// function initialze the database and environment
//----------------------------------------------------------------------------
func InitializeEnvironment() {

	//----------------------------------------------------------------------------
    // load .env file
    //----------------------------------------------------------------------------
    err := godotenv.Load()

    if err != nil {
        log.Println("No .env file found. Using environment variables.")
    }

    fmt.Println("DB_USER_NAME =", os.Getenv("DB_USER_NAME"))
    fmt.Println("DB_PASSWORD SET =", os.Getenv("DB_PASSWORD") != "")
    fmt.Println("DB_HOST =", os.Getenv("DB_HOST"))
    fmt.Println("DB_PORT =", os.Getenv("DB_PORT"))
    fmt.Println("DB_NAME =", os.Getenv("DB_NAME"))

	//----------------------------------------------------------------------------
	// Open the mysql database and initialize the ORM
	//----------------------------------------------------------------------------

    var dsn string
    switch dbVersion := os.Getenv("DB_VERSION"); dbVersion {
	    case "postgres":
		    // example: host=localhost user=gorm password=gorm dbname=gorm port=9920 sslmode=disable TimeZone=Asia/Shanghai
		    dsn = fmt.Sprintf( "host=%s user=%s password=%s dbname=%s port=%s %s", 
						os.Getenv("DB_HOST"),
                        os.Getenv("DB_USER_NAME"),
                        os.Getenv("DB_PASSWORD"),
                        os.Getenv("DB_NAME"),
                        os.Getenv("DB_PORT"),
                        os.Getenv("DB_ARGS") )
	    case "sqlite" :
		    dsn = fmt.Sprintf( "%s %s", os.Getenv("DB_NAME"), os.Getenv("DB_ARGS") )

	    case "sqlserver" :
		    // example: sqlserver://gorm:LoremIpsum86@localhost:9930?database=gorm
           dsn = fmt.Sprintf( "sqlserver://%s:%s@%s:%s?database=%s&%s", 
    						os.Getenv("DB_USER_NAME"), 
    						os.Getenv("DB_PASSWORD"), 
    						os.Getenv("DB_HOST"), 
    						os.Getenv("DB_PORT"), 
    						os.Getenv("DB_NAME"), 
    						os.Getenv("DB_ARGS") )
	    default:
		    // default to mysql
		    // example: gorm:gorm@tcp(localhost:9910)/gorm?charset=utf8&parseTime=True&loc=Local
            dsn = fmt.Sprintf( "%s:%s@tcp(%s:%s)/%s?%s", 
        						os.Getenv("DB_USER_NAME"), 
        						os.Getenv("DB_PASSWORD"), 
        						os.Getenv("DB_HOST"), 
        						os.Getenv("DB_PORT"), 
        						os.Getenv("DB_NAME"), 
        						os.Getenv("DB_ARGS") )
	}
	
	fmt.Println( "Connecting to the database using DSN ", dsn )
		
	disableFKConstraint,_ := strconv.ParseBool(os.Getenv("DB_DISABLE_FK_CONSTRAINTS"));
	
    db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
        DisableForeignKeyConstraintWhenMigrating: disableFKConstraint,
    })

    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }
	//----------------------------------------------------------------------------
	// Handle schema creation or update
	//----------------------------------------------------------------------------
	AutoMigrate()
}

//----------------------------------------------------------------------------
// Returns the database instance
//----------------------------------------------------------------------------
func GetDB() *gorm.DB {
	return db
}

//----------------------------------------------------------------------------
// Parses the body of the HTTP Request and unmarshal it via JSON into the
// provided interface
//----------------------------------------------------------------------------
func ParseBody(r *http.Request, x interface{}) {
	if body, err := ioutil.ReadAll(r.Body); err == nil {
		if err := json.Unmarshal([]byte(body), x); err != nil {
			return
		}
	}
}

//----------------------------------------------------------------------------
// Handler to AutoMigrate schema to gorm for each model struct
//----------------------------------------------------------------------------
func AutoMigrate() {
    GetDB().AutoMigrate(&model.WealthFirm{})
    GetDB().AutoMigrate(&model.Office{})
    GetDB().AutoMigrate(&model.Advisor{})
    GetDB().AutoMigrate(&model.AdvisoryTeam{})
    GetDB().AutoMigrate(&model.Household{})
    GetDB().AutoMigrate(&model.Client{})
    GetDB().AutoMigrate(&model.KycRecord{})
    GetDB().AutoMigrate(&model.Beneficiary{})
    GetDB().AutoMigrate(&model.Custodian{})
    GetDB().AutoMigrate(&model.Account{})
    GetDB().AutoMigrate(&model.Portfolio{})
    GetDB().AutoMigrate(&model.InvestmentProgram{})
    GetDB().AutoMigrate(&model.ModelPortfolio{})
    GetDB().AutoMigrate(&model.AssetAllocationSlice{})
    GetDB().AutoMigrate(&model.InvestmentPolicy{})
    GetDB().AutoMigrate(&model.RiskAssessment{})
    GetDB().AutoMigrate(&model.WealthGoal{})
    GetDB().AutoMigrate(&model.Security{})
    GetDB().AutoMigrate(&model.MarketPrice{})
    GetDB().AutoMigrate(&model.CorporateAction{})
    GetDB().AutoMigrate(&model.Dividend{})
    GetDB().AutoMigrate(&model.Position{})
    GetDB().AutoMigrate(&model.TaxLot{})
    GetDB().AutoMigrate(&model.Transaction{})
    GetDB().AutoMigrate(&model.Order_{})
    GetDB().AutoMigrate(&model.OrderAllocation{})
    GetDB().AutoMigrate(&model.Trade{})
    GetDB().AutoMigrate(&model.RebalancePlan{})
    GetDB().AutoMigrate(&model.PerformanceReport{})
    GetDB().AutoMigrate(&model.Benchmark{})
    GetDB().AutoMigrate(&model.FeeSchedule{})
    GetDB().AutoMigrate(&model.Fee{})
    GetDB().AutoMigrate(&model.BillingRun{})
    GetDB().AutoMigrate(&model.Invoice{})
    GetDB().AutoMigrate(&model.Document{})
    GetDB().AutoMigrate(&model.Agreement{})
    GetDB().AutoMigrate(&model.ComplianceRule{})
    GetDB().AutoMigrate(&model.ComplianceAlert{})
    GetDB().AutoMigrate(&model.Proposal{})
    GetDB().AutoMigrate(&model.AccountTransfer{})
    GetDB().AutoMigrate(&model.StandingInstruction{})
    GetDB().AutoMigrate(&model.CashMovement{})
    GetDB().AutoMigrate(&model.ResearchNote{})
    GetDB().AutoMigrate(&model.Meeting{})
}