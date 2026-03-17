#!/bin/bash

# Fix JSX structure issues in all files with overflow-x-auto pattern

files=(
    "app/dashboard/fee/deposit-status/page.tsx"
    "app/dashboard/fee/discount-type/page.tsx"
    "app/dashboard/fee/fund-transfer/page.tsx"
    "app/dashboard/fee/structure/page.tsx"
    "app/dashboard/franchise/holder/page.tsx"
    "app/dashboard/fee/payment-detail/page.tsx"
    "app/dashboard/enrollment/inventory/page.tsx"
    "app/dashboard/enrollment/admission-status/page.tsx"
    "app/dashboard/enrollment/dtp-view/page.tsx"
    "app/dashboard/enrollment/enquiry/page.tsx"
    "app/dashboard/brands/ads/page.tsx"
    "app/dashboard/brands/page.tsx"
    "app/dashboard/brands/reports/page.tsx"
    "app/dashboard/library/page.tsx"
    "app/dashboard/franchise/invoice-details/page.tsx"
    "app/dashboard/franchise/invoice-download/page.tsx"
    "app/dashboard/franchise/type/page.tsx"
    "app/dashboard/franchise/receipt-dashboard/page.tsx"
    "app/dashboard/franchise/purchase/page.tsx"
    "app/dashboard/franchise/page.tsx"
    "app/dashboard/users/page.tsx"
    "app/dashboard/exams/online/page.tsx"
    "app/dashboard/exams/offline/page.tsx"
    "app/dashboard/administration/page.tsx"
    "app/dashboard/staff/attendance/page.tsx"
    "app/dashboard/staff/details/page.tsx"
    "app/dashboard/staff/assessment/page.tsx"
    "app/dashboard/staff/teaching-subject/page.tsx"
    "app/dashboard/account/soa-summary/page.tsx"
    "app/dashboard/account/soa-details/page.tsx"
    "app/dashboard/reports/enquiry-details/page.tsx"
    "app/dashboard/reports/fee-card-details/page.tsx"
    "app/dashboard/reports/admission-details/page.tsx"
    "app/dashboard/reports/lsq-enquiry-details/page.tsx"
    "app/dashboard/operation/purchase-order/page.tsx"
    "app/dashboard/operation/static-data/page.tsx"
    "app/dashboard/operation/exchange-order/page.tsx"
    "app/dashboard/academics/parents/page.tsx"
    "app/dashboard/academics/teachers/page.tsx"
    "app/dashboard/settings/access/page.tsx"
    "app/dashboard/settings/integrations/page.tsx"
    "app/dashboard/visitors/page.tsx"
    "app/dashboard/tools/academic/page.tsx"
    "app/dashboard/tools/fee-calculator/page.tsx"
    "app/dashboard/shortage/download-report/page.tsx"
    "app/dashboard/shortage/report/page.tsx"
    "app/dashboard/shortage/damage/page.tsx"
    "app/dashboard/access/brands/page.tsx"
    "app/dashboard/access/roles/page.tsx"
    "app/dashboard/access/users/page.tsx"
    "app/dashboard/lms/page.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Fixing $file..."
        
        # Fix the opening table structure
        sed -i.bak 's|<div className="overflow-x-auto">|<div className="overflow-x-auto">|g' "$file"
        sed -i.bak '/<div className="overflow-x-auto">/,/<Table>/{ s|<Table>|<div className="rounded-md border min-w-\[700px\]">\
                <Table>|; }' "$file"
        
        # Fix the closing table structure  
        sed -i.bak '/<\/Table>/,/<\/CardContent>/{ s|<\/Table>|</Table>\
              </div>\
            </div>|; }' "$file"
        
        echo "Fixed $file"
    else
        echo "File $file not found"
    fi
done

echo "All files fixed!"
